---
slug: menyimpan-file-response-laravel-http
title: Cara Menyimpan Response Menjadi File dari Laravel Http Request
description: Laravel menyediakan HTTP client (Guzzle) untuk mengirim request HTTP ke URL tertentu. Response dari request tersebut dapat disimpan ke dalam file dengan `sink` method.
tag: [php, laravel]
date: 2026-04-21
thumbnail: ./images/menyimpan-file-response-laravel-http/thumbnail.png
---

Laravel menyediakan HTTP client (Guzzle) untuk mengirim request HTTP ke URL tertentu. Response dari request tersebut dapat disimpan ke dalam file dengan `sink` method.

Syntaxnya:

```php
Http::sink('tempat_simpan_file')
	->get('url')
```

Untuk menyimpan file ke direktori `storage` gunakan helper `storage_path`. Contoh:

```php
Http::sink(storage_path('app/downloads/nama_file.png'))
	->get('url');
```

Contoh: Mendownload gambar dari URL:

```php
use Illuminate\Support\Facades\Http;

Http::sink(storage_path('app/downloads/dog.png'))
	->get('https://picsum.photos/id/237/200/300');
```

Contoh: Mendownload avatar user dari oauth (menggunakan socialite):

```php
use Laravel\Socialite\Socialite;
use Illuminate\Support\Facades\Http;

$user = Socialite::driver('google')->user();
$filePath = storage_path('app/user-avatars/' . basename($user->getAvatar()));

Http::sink($filePath)
	->get($user->getAvatar());
```