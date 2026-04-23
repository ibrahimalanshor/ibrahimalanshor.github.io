---
slug: laravel-custom-helpers
title: "Cara Membuat Custom Helper di Laravel"
description: Helper di Laravel adalah fungsi yang sering digunakan dan dapat dipanggil di mana saja.
tag: [php, laravel]
date: 2026-04-23
thumbnail: ./images/laravel-custom-helpers/thumbnail.png
---

Helper di Laravel adalah fungsi yang sering digunakan dan dapat dipanggil di mana saja.

Laravel sudah menyediakan berbagai [helpers](https://laravel.com/docs/13.x/helpers#introduction) seperti `asset`, `now`, `route`, dll.

Kita juga bisa membuat custom helpers sendiri, berikut langkah-langkahnya:

## 1. Membuat File Helpers

Buat file `php` yang berisi daftar helpers, misalnya di `app/Support/helpers.php`.

Contohnya disini ada helper `setting` untuk mengampil key setting dari cache. 

```php
<?php

function setting(string $key): ?string
{
    $setting = cache('setting');

    if (!$setting) {
        return null;
    }

    if (!array_key_exists($key, $setting)) {
        return null;
    }

    return $setting[$key];
}
```

## 2. Menambahkan Helpers ke Autoload

Buka file `composer.json`. Tambahkan file helpers yang telah dibuat lengkap dengan pathnya di `autoload.files`.

```json
{
    "autoload": {
        "files": [
            "app/Support/helpers.php"
        ]
    }
}
```

## 3. Jalankan Composer Dump Autoload

Jalankan `composer dump-autoload` untuk memperbarui autoloader.

```bash
composer dump-autoload
```

## 4. Menggunakan Helpers

Helper siap digunakan, contoh penggunan:

```php
setting('site_name') // null | string
```