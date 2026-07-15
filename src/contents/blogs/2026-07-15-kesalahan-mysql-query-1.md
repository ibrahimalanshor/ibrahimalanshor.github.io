---
slug: kesalahan-mysql-query-satu-urutan-kolom-update
title: "Kesalahan di Query MySQL #1: Urutan Kolom Update"
description: Ada satu kesalahan fatal yang bisa terjadi ketika hendak mengupdate beberapa kolom sekaligus di MySQL, yaitu urutan kolom update.
tag: [mysql]
date: 2026-07-15
thumbnail: ./images/kesalahan-mysql-query-satu-urutan-kolom-update/thumbnail.png
---

Ada satu kesalahan fatal yang bisa terjadi ketika hendak mengupdate beberapa kolom sekaligus di MySQL.

Yaitu **urutan kolom update**, ketika ada kolom yang nilai updatenya diambil dari kolom lain sedangkan kolom lain tersebut juga ikut diupdate.

## Studi Kasus

Contohnya ada tabel `orders` dengan kolom.

- `product_packed` menyimpan nilai barang yang sudah dikemas (siap dikirim).
- `product_in_delivery` menyimpan yang sedang dikirim.

| id | product_packed | product_in_delivery |
| --- | --- | --- |
| 1 | 15 | 0 |

Ada fitur mengirim barang yang sudah dikemas, fitur tersebut harus melakukan perubahan kolom:

- `product_packed` menjadi `0`
- `product_in_delivery` menjadi sejumlah di `product_packed`

Maka bisa dibuat dengan query berikut:

```sql
UPDATE orders
SET
	product_packed = 0,
	product_in_delivery = product_packed
WHERE
	id = 1;
```

Hasilnya:

| id | product_packed | product_in_delivery |
| --- | --- | --- |
| 1 | 0 | 0 |

Ternyata hasilnya salah. Kedua kolom tersebut malah menjadi `0`.

## Solusi

Solusinya dari masalah sebelumnya dengan mengubah urutan kolom yang diupdate:

- `product_in_delivery` menjadi sejumlah di `product_packed`
- `product_packed` menjadi `0`

Querynya jadi seperti berikut:

```sql
UPDATE orders
SET
	product_in_delivery = product_packed,
	product_packed = 0
WHERE
	id = 1;
```

Hasilnya:

| id | product_packed | product_in_delivery |
| --- | --- | --- |
| 1 | 0 | 15 |

Hasilnya sudah benar. `product_packed` menjadi 0, `product_in_delivery` menjadi sejumlah `product_packed` (`15`).

## Penjelasan

Di MySQL, ketika suatu kolom diakses sedangkan dia juga ikut diupdate, maka nilainya mengikuti nilai kolom saat itu juga meskipun belum `UPDATE` diekseusi.

> If you access a column from the table to be updated in an expression, `UPDATE` uses the current value of the column.
> 

Misalnya ada data kolom`product_packed` dengan nilai `15`. 

Lalu ada `UPDATE` dengan dua set:

1. `product_packed` = `0`
2. `product_in_delivery` =`product_packed`

Maka nilai `product_packed` di set kedua adalah `0` meskipun `UPDATE` belum dieksekusi.

Kalau dibalik:

1. `product_in_delivery` =`product_packed`
2. `product_packed` = `0` 

Maka nilai `product_packed` di set pertama adalah `15` karena nilai belum sampai dijadikan `0` di set kedua.