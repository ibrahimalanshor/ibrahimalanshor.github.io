---
slug: membuat-ai-agent-di-laravel
title: "Tutorial Membuat AI Agent di Laravel"
description: AI Agent adalah sistem yang terhubung dan dijalankan oleh AI. AI agent menerima input dari pengguna kemudian dia memilih tool mana yang akan digunakan untuk menjawab input pengguna.
tag: [php, ai]
date: 2026-04-30
thumbnail: ./images/membuat-ai-agent-di-laravel/thumbnail.png
---

AI Agent adalah sistem yang terhubung dan dijalankan oleh AI. AI agent menerima input dari pengguna kemudian dia memilih tool mana yang akan digunakan untuk menjawab input pengguna.

Contoh agent:

- Assistant Agent: Agent yang membantu pengguna melakukan tugas tertentu pada sistem.
- Insight Agent: Agent yang menampilkan informasi pada sistem yang diminta oleh pengguna.

Setiap agent membutuhkan tool, untuk menghasilkan jawaban dari pertanyaan pengguna.

Contoh tool:

- Assistant Agent:
    - Tool membuat penjualan baru.
    - Tool menampilkan detail penjualan.
- Insight Agent:
    - Tool menampilkan total penjualan.
    - Tool menampilkan harga barang.

Di laravel, kita bisa membuat AI agent beserta toolnya dengan package [Laravel AI SDK](https://laravel.com/docs/13.x/ai-sdk).

Contohnya di sini kita akan membuat Insight Agent untuk membantu melihat informasi pada sistem, dengan dua tool:

1. Menampilkan informasi seputar penjualan.
2. Menampilkan informasi seputar barang.

## 1. Instalasi SDK

Pertama, instal laravel AI SDK dengan composer, buat konfigurasi dan file migrasi. Jalankan perintah berikut:

```bash
composer require laravel/ai
php artisan vendor:publish --provider="Laravel\Ai\AiServiceProvider"
php artisan migrate
```

Tambahkan key dari AI provider yang akan digunakan agent di file `.env`. Taruh key sesuai dengan nama provider:

```bash
ANTHROPIC_API_KEY=
AZURE_OPENAI_API_KEY=
COHERE_API_KEY=
DEEPSEEK_API_KEY=
ELEVENLABS_API_KEY=
GEMINI_API_KEY=
GROQ_API_KEY=
MISTRAL_API_KEY=
OLLAMA_API_KEY=
OPENAI_API_KEY=
OPENROUTER_API_KEY=
JINA_API_KEY=
VOYAGEAI_API_KEY=
XAI_API_KEY=
```

## 2. Membuat Agent

Selanjutnya, buat agent dengan artisan:

```bash
php artisan make:agent Insight
INFO Agent [app/Ai/Agents/Insight.php] created successfully.
```

Kemudian, agent perlu dideksripsikan apa fungsinya.

Buka file agent `Insight.php` . Deskripsikan fungsi atau instruksi agent pada method `instruction`. Contoh:

```php
class Insight implements Agent, Conversational, HasTools
{
    use Promptable;

    public function instructions(): Stringable|string
    {
        return 'You are an Operational Data Assistant who answers user questions strictly using data retrieved from the system through the provided database or schema tools, never guessing or fabricating information, clearly stating when the requested data is not available, keeping responses clear and concise, and always responding in Indonesian.';
    }
}

```

## 3. Membuat Tool

Buat tool yang akan digunakan agent, ada dua tool yang akan dibuat:

1. Order Insight: Menampilkan informasi seputar penjualan.
2. Product Insight: Menampilkan informasi seputar barang.

Buat dua tool tersebut dengan artisan:

```bash
php artisan make:tool OrderInsight
INFO Tool [app/Ai/Tools/OrderInsight.php] created successfully.

php artisan make:tool ProductInsight
INFO Tool [app/Ai/Tools/ProductInsight.php] created successfully.
```

### Membuat Tool Order Insight

Buka file tool `OrderInsight.php`.

Pada method `description` isi dengan deskripsi fungsi tool tersebut.

```php
class OrderInsight implements Tool
{
    public function description(): Stringable|string
    {
        return 'Use this tool to analyze customer orders, extract key insights such as order trends, product performance, customer behavior, and generate concise summaries or metrics based on order data.';
    }
}

```

Pada method `handle`, isi dengan data yang nanti akan digunakan oleh AI untuk menghasilkan jawaban dari input pengguna.

Untuk menghasilkan data di method `handle`, kita bisa melakukan query ke database.

Method `handle` akan menerima data dari input pengguna yang sudah diekstrak dalam bentuk array oleh AI, data tersebut dapat diakses melalui variable `$request`. Contoh:

```php
public function handle(Request $request): Stringable|string
{
    $res = Order::whereBetween('created_at', [$request['from_date'], $request['to_date']])
        ->selectRaw('COUNT(*) as total, SUM(total_price) as total_price')
        ->first();

    return json_encode([
        'total' => (int) $res->total,
        'total_price' => (float) $res->total_price,
    ]);
}
```

Pada method `schema` , isi dengan properti apa saja yang dibutuhkan untuk menghasilkan data dari tool. AI akan otomatis melakukan ekstraksi input pengguna ke dalam skema yang dibuat. Contoh:

```php
public function schema(JsonSchema $schema): array
{
    return [
        'start_at' => $schema->string()->required()->description('Start datetime in ISO 8601 format'),
        'end_at'   => $schema->string()->required()->description('End datetime in ISO 8601 format'),
    ];
}
```

### Membuat Tool Product Insight

Lakukan hal yang sama untuk tool `ProductInsight.php`. Contoh:

```php
class ProductInsight implements Tool
{
    public function description(): Stringable|string
    {
        return 'Use this tool to retrieve detailed information about a product based on its unique code, including name, price, stock, and key attributes.';
    }

    public function handle(Request $request): Stringable|string
    {
        $product = Product::firstWhere('code', $request['code']);

        if (!$product) {
            return 'Product not found';
        }

        return json_encode([
            'code' => $product->code,
            'name' => $product->name,
            'price' => (float) $product->price,
            'stock' => (int) $product->stock,
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'code' => $schema->string()->required()->description('Unique product code'),
        ];
    }
}
```

## 4. Menambahkan Tool Ke Agent

Buka file agent `Insight.php`. Pada method `tools`, tambahkan dua tool yang sudah dibuat ke dalam array yang direturn.

```php
public function tools(): iterable
{
    return [
        new AgentInsight,
        new ProductInsight
    ];
}
```

## 5. Memilih Model

Pilih model yang akan digunakan agent dengan menambahkan atribut `Provider` dan `Model` di class agent. Contoh:

```php
#[Provider('openai')]
#[Model('gpt-5.4-nano')]
class Insight implements Agent, Conversational, HasTools
{
}
```

## 6. Mencoba Agent

Agent dapat digunakan di controller, console dll. Contoh kita coba di console.

Buka file `routes/console.php`. Tambahkan command berikut.

```php
Artisan::command('insight', function () {
    while (true) {
        $ask = $this->ask('Ask something');
        
        $answer = (new Insight)
            ->prompt($ask);

        $this->info($answer);
    }
});
```

Coba agent dengan menjalankan perintah artisan.

```bash
php artisan insight
```

Masukkan pertanyaan maka agent akan menjawabnya:

```bash
Ask something:
 > Berapa harga barang NCX

Harga barang **NCX (NATURAL CRISTAL-X)** adalah:

- **Harga Stokist Wilayah 0:** Rp **110.000**
- **Wilayah 1:** Rp **113.000**
- **Wilayah 2:** Rp **115.000**
- **Wilayah 3:** Rp **117.000**
- **Wilayah 4:** Rp **120.000**

Kalau Anda sebutkan **wilayah** atau **jenis harga** yang dimaksud (stokist/karyawan/konsumen/distributor), saya bisa pilihkan yang paling tepat.
```

## Selanjutnya

Agent bisa digunakan untuk fungsi lain, misalnya:

- Text To SQL, mengubah input pengguna jadi query sql untuk mendapatkan data yang diinginkan.
- RAG,  mendapatkan data untuk menjadi sumber jawaban bagi AI.
- File search, Web search, dll.

Baca selengkapnya di [Laravel AI SDK](https://laravel.com/docs/13.x/ai-sdk).