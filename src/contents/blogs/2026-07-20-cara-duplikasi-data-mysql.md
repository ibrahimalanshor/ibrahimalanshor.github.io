---
slug: cara-duplikasi-data-mysql
title: "Cara Duplikasi Data di MySQL"
description: Cara menduplikasi data di MySQL bisa dengan mengkombinasikan statement SELECT dan INSERT.
tag: [mysql]
date: 2026-07-20
thumbnail: ./images/cara-duplikasi-data-mysql/thumbnail.png
---

Cara menduplikasi data di MySQL bisa dengan mengkombinasikan statement `SELECT` dan `INSERT`.

- `SELECT` untuk mengambil data yang ingin diduplikasi.
- `INSERT` untuk menyimpan data hasil duplikasi.

Contoh ada komentar:

| id | content | rating |
| --- | --- | --- |
| 1 | Terimakasih infonya. | 5 |
| 2 | Sangat bermanfaat. | 4 |

Kemdian komentar id `2` ingin diduplikasi. Berikut contoh querynya:

```sql
INSERT INTO
	comments (content, rating)
SELECT content, rating
FROM comments
WHERE id = 2;	
```

Hasilnya:

| id | content | rating |
| --- | --- | --- |
| 1 | Terimakasih infonya. | 5 |
| 2 | Sangat bermanfaat. | 4 |
| 3 | Sangat bermanfaat. | 4 |

Pada contoh tersebut, kolom `ID` tidak perlu diselect karena nilainya `auto_increment`.

Pastikan urutan hasil `SELECT` dan `INSERT VALUES`  sesuai agar hasilnya benar. 

## Duplikasi dengan Nilai Custom

Kalau ada kolom yang tidak ingin diduplikasi, maka kolom tersebut tidak perlu diselect. Atau bisa juga diisi dengan nilai custom di dalam `SELECT`.

Contohnya pada data di atas komentar id `2` ingin diduplikasi `content` nya saja, ratingnya dibuat `0`. Maka querynya:

```php
INSERT INTO
	comments (content, rating)
SELECT content, 0
FROM comments
WHERE id = 2;
```

Hasilnya:

| id | content | rating |
| --- | --- | --- |
| 1 | Terimakasih infonya. | 5 |
| 2 | Sangat bermanfaat. | 4 |
| 3 | Sangat bermanfaat. | 0 |

## Duplikat Data Dari Tabel yang Berbeda

Duplikasi data juga bisa dilakukan dari tabel yang berbeda.

Contoh ada tabel `customers`:

| id | name |
| --- | --- |
| 1 | Oblak |
| 2 | Fuad |

Lalu ingin diduplikasi semua `customers` ke tabel `users`. Dengan tambahan email dari kolom `name`.

Contoh query:

```php
INSERT INTO
	users (name, email)
SELECT name, CONCAT(LOWER(REPLACE(name, ' ', '_')), '@example.com')
FROM customers;
```

Hasilnya di tabel `users`:

| id | name | email |
| --- | --- | --- |
| 1 | Oblak | oblak@example.com |
| 2 | Fuad | fuad@example.com |

---

Referensi: https://dev.mysql.com/doc/refman/9.7/en/insert-select.html