---
slug: php-cek-total-rows-csv
title: "PHP: Cara Cek Jumlah Baris File CSV"
description: Jumlah baris di file CSV bisa dihitung dengan memanfaatkan PHP SplFileObject.
tag: [php]
date: 2026-08-11
thumbnail: ./images/php-cek-total-rows-csv/thumbnail.png
---

Menghitung jumlah baris pada file CSV bisa dimanfaatkan untuk berbagai kebutuhan, misalnya:

1. Memvalidasi minimal atau maksimal jumlah baris.
2. Memproses CSV menjadi beberapa chunk.
3. Membuat progress pada pemrosesan CSV.

Di PHP, kita bisa memanfaatkan `SplFileObject` untuk menghitung jumlah baris. Caranya:

1. Load CSV ke dalam `SplFileObject`.
2. Pindah ke baris terakhir pada CSV.
3. Ambil baris terakhir untuk dijadikan jumlah baris CSV.
4. Tambahkan 1 karena baris CSV dimulai dari 0.
5. Kurangi 1 jika terdapat header pada CSV dan tidak ingin ikut dihitung.

Hasil kode:

```php
function countRows(string $filepath, bool $includeHeader = false) : int
{
	$file = new SplFileObject($filepath);
	$file->seek(PHP_INT_MAX);
	
	$rows = $file->key() + 1;
	
	if ($includeHeader) {
        return $rows;
    }
	
	return $rows - 1; 
}
```

- Method `seek` digunakan untuk pindah ke baris tertentu di CSV.
- Method `key` digunakan mengambil nomor baris saat ini.
- Seek ke `PHP_INT_MAX` digunakan utnuk pindah ke baris terakhir di CSV.

Contoh penggunaan:

## 1. Memvalidasi Minimal atau Maksimal Jumlah Baris

Misalnya ingin validasi CSV minimal 10 baris dan maksimal 100 baris:

```php
$file = 'uploads/contoh.csv';

$min = 10;
$max = 100;

$rows = countRows($file, true);

if ($rows < $min || $rows > $max) {
    throw new Exception("minimal: $min maksimal: $max");
}

// process file
```

## 2. Memproses CSV Menjadi Beberapa Chunk

Misalnya ingin memproses CSV dibuat jadi satu chunk per 1000 baris. Maka total chunk bisa diketahui dengan mengambil jumlah baris dibagi 1000.

```php
$file = 'uploads/contoh.csv';

$chunkSize = 1000;
$rows = countRows($file, true);

$totalChunks = ceil($rows / $chunkSize);

foreach (range(0, $totalChunks - 1) as $chunk) {
	$start = $chunk * $chunkSize;
	
	dispatchProcessCsv($start);
}
```

Jika jumlah rows CSV ada 5000 maka hasilnya:

```
dispatchProcessCsv(0);
dispatchProcessCsv(1000);
dispatchProcessCsv(2000);
dispatchProcessCsv(3000);
dispatchProcessCsv(4000);
```

## 3. Membuat Progress Proses CSV

Misalnya ingin membuat progress bar dari proses CSV.

Nilai progress dari setiap proses dihitung dari jumlah baris yang sudah diproses dibagi dengan jumlah rows.

```php
$filepath = 'uploads/contoh.csv';

$rows = countRows($filepath, true);

$file = new SplFileObject($filepath);

$processed = 0;
$progress = 0;

foreach ($file as $row) {
	$processed++;
	
	$progress = ceil($processed / $rows * 100);
	
	echo "$progress%";
}
```

Jika jumlah rows CSV ada 100 maka hasilnya:

```
1%
2%
4%
...
100%
```