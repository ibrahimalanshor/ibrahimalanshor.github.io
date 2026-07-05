---
slug: mysql-upsert
title: "Upsert: Cara Update atau Insert Untuk Data Besar Secara Efisien"
description: Upsert adalah operasi update atau insert. Upsert dapat digunakan untuk menambahkan data berukuran besar atau mengupdatenya kalau sudah ada.
tag: [mysql, laravel]
date: 2026-07-05
thumbnail: ./images/upsert-mysql/thumbnail.png
---

Misalnya kita ingin membuat sinkronisasi data pada suatu tabel, kalau datanya belum ada maka di-insert, kalau sudah ada maka di-update.

Kita bisa melakukannya dengan method `updateOrCreate` . Contoh:

```php
<?php

use App\Models\User;

$data = collect([/*dataset*/]);

$data->each(function ($item) {
	User::updateOrCreate(
		['email' => $item['email']],
		[
			'name' => $item['name'],
			'cellphone' => $item['cellphone']
		],
	);
});
```

Cara di atas akan menghasilkan dua query SQL pada setiap item, query select dan insert atau update.

```sql
SELECT * FROM users WHERE email = ? limit 1;

-- Kalau ada
UPDATE users SET name = ?, cellphone = ? WHERE id = ?;

-- Kalau tidak ada
INSERT INTO users (email, name, cellphone) VALUES (?, ?, ?);
```

Kalau datanya banyak maka akan terjadi banyak query SQL yang menyebabkan eksekusi menjadi lama, salah satu akibatnya bisa timeout.

Untuk mengatasinya kita bisa menggunakan `upsert`.

## Upsert di MySQL

Upsert adalah operasi update atau insert.

Sebenarnya, upsert adalah operasi insert dengan handle jika ada error duplikat data pada kolom tertentu maka operasi diganti jadi update.

Contoh ada data berikut di tabel users.

```sql
SELECT * FROM users;

-- +----+--------+-----------+------------------+
-- | id | name   | cellphone | email            |
-- +----+--------+-----------+------------------+
-- |  1 | Amin   | 082       | amin@gmail.com   |
-- |  2 | Sufyan | 081       | sufyan@gmail.com |
-- |  3 | Badri  | 083       | badri@gmail.com  |
-- +----+--------+-----------+------------------+
```

Kolom `email` itu unik di tabel `users`. Maka query insert berikut akan menghasilkan error:

```sql
INSERT INTO users
	(email, name, cellphone)
VALUES
	('amin@gmail.com', 'Amin', '082'),
	('sufyan@gmail.com', 'Sufyan', '081'),
	('badri@gmail.com', 'Badri', '083');
	
-- ERROR 1062 (23000): Duplicate entry 'amin@gmail.com' for key 'users.users_email_unique'
```

Nah kita bisa menghandle error tersebut untuk diubah menjadi operasi update.

Jadi row yang tidak error unik akan tetap insert seperti biasa dan row yang error unik akan diupdate saja.

Cara melakukannya di MySQL adalah dengan menambahkan `ON DUPLICATE KEY UPDATE` statement, diikuti dengan operasi update kolomnya.

Fungsi `VALUES` bisa digunakan untuk mengambil nilai dari insert, tapi ini sudah deprecated di MySQL versi 8 ke atas, untuk gantinya bisa menggunakan alias di values insert.

```sql
INSERT INTO users
	(email, name, cellphone)
VALUES
	('amin@gmail.com', 'Amini', '082'),
	('sufyan@gmail.com', 'Soofyan', '081'),
	('hasan@gmail.com', 'Hasan', '083')
ON DUPLICATE KEY UPDATE
	name = VALUES(name),
	cellphone = VALUES(cellphone);
	
-- Untuk MySQL v8 keatas

INSERT INTO users
	(email, name, cellphone)
VALUES
	('amin@gmail.com', 'Amini', '082'),
	('sufyan@gmail.com', 'Soofyan', '081'),
	('hasan@gmail.com', 'Hasan', '083')
AS NEW
ON DUPLICATE KEY UPDATE
	name = NEW.name,
	cellphone = NEW.cellphone;
```

Hasilnya:

```php
SELECT * FROM users;

# +----+---------+-----------+------------------+
# | id | name    | cellphone | email            |
# +----+---------+-----------+------------------+
# |  1 | Amini   | 082       | amin@gmail.com   |
# |  2 | Soofyan | 081       | sufyan@gmail.com |
# |  3 | Badri   | 083       | badri@gmail.com  |
# |  4 | Hasan   | 083       | hasan@gmail.com  |
# +----+---------+-----------+------------------+
```

## Upsert MySQL Di Laravel

Laravel menyediakan cara untuk upsert di query builder dengan method `upsert` .

- Parameter pertama diisi array datanya.
- Parameter kedua diisi kolom-kolom untuk mencocokan data.
- Parameter ketiga diisi kolom-kolom yang akan diupdate ketika data sudah ada.

```php
<?php

use App\Models\User;

$data = collect([/*dataset*/]);

User::upsert(
	$data,
	['email'],
	['name', 'cellphone'],
);
```

## Syarat Upsert MySQL

Untuk melakukan upsert, pastikan harus ada kolom yang unik, karena itu akan digunakan untuk mendeteksi apakah data sudah ada.

Karena kalau tidak ada maka operasi upsert tidak akan mendeteksi data yang duplikat, sehingga setiap upsert akan menginsert semua data.