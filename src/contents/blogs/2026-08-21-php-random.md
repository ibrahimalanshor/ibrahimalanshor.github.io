---
slug: php-random
title: "PHP: 3 Fungsi Untuk Generate Random Integer"
description: "Ada tiga fungsi bawaan PHP untuk generate random integer: mt_rand, rand, dan random_int"
tag: [php]
date: 2026-08-21
thumbnail: ./images/php-random/thumbnail.png
---

Ada tiga fungsi bawaan PHP untuk generate random integer:

1. `random_int`
2. `rand`
3. `mt_rand` 

`rand` sebenarnya memanggil `mt_rand` sejak versi PHP 7, keduanya hasilnya akan sama.

Perbedaan singkatnya:

- `mt_rand` menggunakan algoritma [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister). Hasilnya random, tapi masih bisa ditebak.
- `random_int` memanfaatkan sumber random dari OS. Hasilnya random dan tidak bisa ditebak.

Karena hasil dari `mt_rand` masih bisa ditebak, maka untuk kebutuhan random yang bersifat keamanan wajib pakai `random_int`, contohnya:

1. OTP
2. Password reset token
3. Secret key
4. Verification key

Adapun untuk kebutuhan yang non-keamanan, boleh pakai `mt_rand`, contohnya:

1. Random nomor dadu
2. Random elemen di array
3. Mengacak data

## Syntax

`rand` , `mt_rand` , dan `random_int` sama-sama menerima dua argumen, minimal dan maksimal hasil angka random.

```php
rand(20, 100); // 20 s.d 100
mt_rand(1, 10); // 1 s.d 10
random_int(5, 10); // 5 s.d 10
```

## Contoh Penggunaan

Berikut beberapa contoh penggunaan random integer generator:

### Membuat OTP

Contoh penggunaan random integer untuk membuat OTP menggunakan `random_int` .

```php
$otp = random_int(100000, 999999);
```

### Mengambil Random Elemen di Array

Contoh penggunaan random integer untuk mengambil elemen random di array menggunakan `mt_rand`.

```php
$items = [1, 2, 3, 4, 5];
$randomItem = $items[mt_rand(0, count($items) - 1)];
```