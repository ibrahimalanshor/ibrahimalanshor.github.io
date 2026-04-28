---
slug: mysql-datetime-vs-timestamp
title: "Perbedaan Datetime VS Timestamp di MySQL"
description: Timestamp dan datetime adalah tipe data yang digunakan untuk menyimpan tanggal dan waktu di MySQL. Keduanya memiliki beberapa perbedaan.
tag: [mysql]
date: 2026-04-28
thumbnail: ./images/mysql-datetime-vs-timestamp/thumbnail.png
---

Timestamp dan datetime adalah tipe data yang digunakan untuk menyimpan tanggal dan waktu di MySQL.

Lalu apa bedanya? Kapan menggunakan timestamp dan kapan menggunakan datetime? Berikut jawabanya:

## 1. Rentang Waktu Datetime Lebih Panjang

Datetime dapat menyimpan tanggal dan waktu dari `1000-01-01 00:00:00` sampai `9999-12-31 23:59:59` .

Sedangkan timestamp dapat menyimpan tanggal dan waktu dari  `1970-01-01 00:00:01` sampai `2038-01-19 03:14:07` . Lebih pendek dari datetime.

Jika kita mencoba memasukkan tanggal 17 Agustus 1945 ke timestamp maka akan terjadi error. Contoh:

```sql
desc events;
+-------+-----------+------+-----+---------+----------------+
| Field | Type      | Null | Key | Default | Extra          |
+-------+-----------+------+-----+---------+----------------+
| id    | int       | NO   | PRI | NULL    | auto_increment |
| date  | timestamp | NO   |     | NULL    |                |
+-------+-----------+------+-----+---------+----------------+
2 rows in set (0.00 sec)

insert into events (date) values ('1945-08-17 10:00:00');
ERROR 1292 (22007): Incorrect datetime value: '1945-08-17 10:00:00' for column 'date' at row 1
```

## 2. Timestamp Hanya Bisa Disimpan di Zona Waktu UTC

Timestamp menyimpan tanggal ke zona waktu UTC. Ketika tanggal dimasukkan, tanggal akan dikonversi ke UTC dari waktu lokal. Ketika ditampilkan, tanggal akan dikonversi dari UTC ke waktu lokal.

Datetime tetap menyimpan tanggal apa adanya sesuai dengan waktu lokal di server.

Contoh ada dua kolom tanggal, satu menggunakan datetime yang lain menggunakan timestamp. Nilai tanggalnya sama.

```sql
select * from events;
+----+---------------------+---------------------+
| id | date_datetime       | date_timestamp      |
+----+---------------------+---------------------+
|  1 | 2024-01-01 10:00:00 | 2024-01-01 10:00:00 |
+----+---------------------+---------------------+
1 row in set (0.00 sec)
```

Ketika zona waktu server diubah, maka tanggal yang ditampikan di timestamp akan berbeda dengan datetime.

Contoh, zona waktu server sebelumnya `Asia/Jakarta`, kemudian diganti ke `Asia/Riyad`. Hasilnya:

```sql
set time_zone = 'Asia/Riyadh';
select * from events;
+----+---------------------+---------------------+
| id | date_datetime       | date_timestamp      |
+----+---------------------+---------------------+
|  1 | 2024-01-01 10:00:00 | 2024-01-01 06:00:00 |
+----+---------------------+---------------------+
1 row in set (0.00 sec)
```

## 3. Timestamp Lebih Kecil Ukurannya

Ukuran kolom timestamp di MySQL adalah 4 - 7 byte, sedangkan datetime 5 - 8 byte.

## Kapan Menggunakan Datetime?

Gunakan datetime pada kasus-kasus berikut:

1. Rentang tanggal di bawah tahun 1970 dan di atas tahun 2038.
2. Tanggal berasal dari input pengguna.
3. Untuk sistem yang menggunakan satu zona waktu.

Contoh tanggal yang baiknya menggunakan datetime:

1. Tanggal dan waktu acara dimulai. 
2. Tanggal dan waktu booking.
3. Tanggal dan waktu deadline.

## Kapan Menggunakan Timestamp?

Gunakan timestamp pada kasus-kasus berikut:

1. Untuk sistem yang digunakan di global/zona waktu yang berbeda-beda, agar tanggal dan waktu konsisten.
2. Jika dari input pengguna maka validasi rangenya minimal 1970 maksimal 2038.

Contoh tanggal yang baiknya menggunakan timestamp:

1. Tanggal dan waktu record dibuat.
2. Tanggal dan waktu record terakhir dimodifikasi.
3. Tanggal dan waktu record dihapus.

## Tabel Perbandingan Datetime vs Timestamp 

|  | Datetime | Timestamp |
| --- | --- | --- |
| Format | `YYYY-MM-DD hh:mm:ss` | `YYYY-MM-DD hh:mm:ss` |
| Rentang Waktu | `1000-01-01 00:00:00`  - `9999-12-31 23:59:59` | `1970-01-01 00:00:01`  - `2038-01-19 03:14:07` |
| Ukuran | 5 - 8 Byte | 4 - 7 Byte |
| Zona Waktu | Mengikuti waktu lokal server | UTC |

## Sumber

- [MySQL 9.6 Reference Manual - The DATE, DATETIME, and TIMESTAMP Types](https://dev.mysql.com/doc/refman/9.6/en/datetime.html)
- [PlanetScale Blog - Datetimes versus timestamps in MySQL](https://planetscale.com/blog/datetimes-vs-timestamps-in-mysql)
- [OWOX Blog - Choosing the Right SQL Date Type: DATE vs. DATETIME vs. TIMESTAMP](https://www.owox.com/blog/articles/bigquery-date-types-date-datetime-timestamp)
- [PingCAP Blog - Choosing the Right MySQL Time Type: Datetime vs. Timestamp](https://www.pingcap.com/article/exploring-mysql-timestamp-vs-datetime-key-differences/)