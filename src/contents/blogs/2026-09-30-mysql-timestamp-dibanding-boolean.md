---
slug: mysql-timestamp-dibanding-boolean
title: "MySQL Database Design: Menggunakan Timestamp Dibanding Boolean"
description: "Timestamp dan boolean adalah dua tipe data yang berbeda di MySQL, terkadang suatu data yang bisa disimpan sebagai boolean bisa juga disimpan sebagai timestamp."
tag: [mysql]
date: 2026-09-30
thumbnail: ./images/mysql-timestamp-dibanding-boolean/thumbnail.png
---

Timestamp dan boolean adalah dua tipe data yang berbeda di MySQL, timestamp untuk menyimpan tanggal dan waktu, sedangkan boolean untuk menyimpan `true` atau `false`.

Namun terkadang suatu data yang bisa disimpan sebagai boolean bisa juga disimpan sebagai timestamp. Contohnya:

- is_deleted (boolean) atau deleted_at (timestamp).
- valid (boolean) atau valid_at (timestamp).
- paid (boolean) atau paid_at (timestamp).

Menyimpan data-data tersebut dalam bentuk timestamp memiliki manfaat, yaitu **extra information.**

## Manfaat Menggunakan Timestamp: Extra Information

Extra information tersebut adalah kapan data tersebut jadi bernilai `true`. Contoh:

1. Jika deleted_at tidak bernilai `null`, dapat diketahui data sudah dihapus dan kapan dihapus.
2. Jika valid_at tidak bernilai `null`, dapat diketahui data tersebut sudah valid dan kapan menjadi valid.
3. Jika paid_at tidak bernilai `null`, dapat diketahui data tersebut sudah dibayar dan kapan dibayar.

## Kekurangan Menggunakan Timestamp Dibanding Boolean

Kekurangan menggunakan timestamp dibanding boolean cuma satu: Ukuran kolom timestamp lebih besar, yaitu 4 byte. Sedangkan boolean hanya 1 byte.

## Penggunaan Timestamp dan Boolean di Kode Program Caranya Sama

Di dalam kode program, pengguaan boolean dan timestamp umumnya tidak perlu diubah.

### NULL Bernilai False

NULL umumnya bernilai `false`. Sehinga kode ini akan menghasilkan hasil yang sama dengan tipe kolom boolean atau timestamp.

```php
// timestamp
abort_if(!$domain->paid_at, 403, 'Domain belum dibayar');

// boolean
abort_if(!$domain->paid, 403, 'Domain belum dibayar');
```

### Tidak Null Bernilai True

Tidak `NULL` umumnya bernilai `true`. Sehinga kode ini akan menghasilkan hasil yang sama dengan tipe kolom boolean atau timestamp.

```php
// timestamp
abort_if($domain->paid_at, 403, 'Domain sudah dibayar');

// boolean
abort_if($domain->paid, 403, 'Domain sudah dibayar');
```

## Menggunakan Timestamp Dibanding Boolean Secara Konsep

Secara konsep, data-data boolean seperti deleted, valid, dan paid adalah data yang awalnya `false` menjadi `true` ketika suatu event terjadi.

Jadi, timestamp memang lebih bagus untuk menyimpan data-data tersebut dibandingkan boolean. Nilai boolean dan waktu event menjadi dapat diketahui dalam satu kolom.