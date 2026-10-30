---
slug: laravel-masalah-soft-delete-dan-solusinya
title: "Laravel: Masalah Soft Delete dengan Kolom Unique Serta Solusinya"
description: "Fitur soft delete dapat menimbulkan masalah dengan kolom yang unique, berikut penjelasan dan solusinya"
tag: [laravel, sql]
date: 2026-10-30
thumbnail: ./images/laravel-masalah-soft-delete-dan-solusinya/thumbnail.png
---

Soft delete adalah cara menandai suatu record sebagai terhapus di database dengan menggunakan kolom `deleted_at`.

Recordnya masih ada, sehingga bisa dibatalkan penghapusannya, istilahnya `restore`.

Untuk penjelasan lebih detailnya bisa baca di [Laravel Eloquent: Soft Delete](https://laravel.com/framework/docs/master/eloquent#soft-deleting).

Soft delete dapat memunculkan masalah baru, yaitu dengan kolom yang unik, berikut penjelasannya.

## Masalah: Validasi Kolom Unique

Jika ada kolom yang unik, maka nilai unik dari record yang dihapus dengan soft delete tidak bisa dipakai di record lain.

Contoh tabel `users` dengan kolom email `unique` .

```
mysql> desc users;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int unsigned | NO   | PRI | NULL    | auto_increment |
| email      | varchar(255) | NO   | UNI | NULL    |                |
| deleted_at | timestamp    | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
3 rows in set (0.01 sec)

mysql> select * from users;
+----+----------------+---------------------+
| id | email          | deleted_at          |
+----+----------------+---------------------+
|  1 | jhon@gmail.com | 2026-10-27 08:16:15 |
|  2 | ray@gmail.com  | NULL                |
|  3 | fik@gmail.com  | NULL                |
+----+----------------+---------------------+
3 rows in set (0.00 sec)
```

Mesikpun email `jhon@email.com` sudah dihapus dengan soft delete, emailnya tetap tidak bisa dipakai di user baru.

```php
<?php

use App\Models\User;

User::create(['email' => 'jhon@gmail.com']);
// ERROR 1062 (23000): Duplicate entry 'jhon@gmail.com' for key 'users.email'
```

Padahal mungkin secara sistem seharusnya bisa, karena user `jhon@gmail.com` sudah dihapus.

Berikut 3 solusi yang bisa dicoba untuk mengatasi masalah ini:

## Solusi 1: Partial Index (PostgreSQL)

> Partial index tidak bisa dilakukan di MySQL.

Partial index adalah index pada kolom yang hanya aktif di kondisi tertentu.

Contohnya pada tabel `users`, kolom email dapat diindex unique hanya jika kolom `deleted_at` berisi `NULL`.

Sehingga, email user yang sudah dihapus dengan soft delete masih bisa digunakan oleh user lain.

```php
CREATE UNIQUE INDEX unique_email_idx
ON users (email)
WHERE deleted_at IS NULL;
```

```php
<?php

use App\Models\User;

User::create(['email' => 'jhon@gmail.com']);
// sukses
```

## Solusi 2: Membuat Kolom Arsip

Buat kolom arsip yang identik dengan kolom unik tapi tidak ada unique index.

Ketika soft delete dilakukan, nilai kolom unik dipindah ke kolom arsip.

Contohnya di tabel `users`, tambahkan kolom baru `email_archived`.

```
mysql> alter table users add email_archived varchar(255) after email;
Query OK, 0 rows affected (0.06 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> desc users;
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| id             | int unsigned | NO   | PRI | NULL    | auto_increment |
| email          | varchar(255) | NO   | UNI | NULL    |                |
| email_archived | varchar(255) | YES  |     | NULL    |                |
| deleted_at     | timestamp    | YES  |     | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)
```

Ketika soft delete dilakukan, kosongkan kolom `email` lalu pindah nilai `email` ke `email_archived`.

Bisa dilakukan di laravel model event `deleted`.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected static function booted(): void
    {
        static::deleting(function (User $user) {
            $user->email_archived = $user->email;
            $user->email = null;
        });
    }
}
```

Ketika record ingin direstore, pindahkan nilai `email_archived` ke `email`. 

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected static function booted(): void
    {
        static::restoring(function (User $user) {
            $user->email = $user->email_archived;
            $user->email_archived = null;
        });
    }
}
```

Jika ternyata email, sudah digunakan oleh user lain, minta user untuk memasukkan email baru. Contoh di controller.

```php
<?php

use App\Models\User;

class UserController extends Controller
{
    public function restore(User $user)
    {
        if (User::where('email', $user->email_archived)->exists()) {
            // minta user memasukkan email baru
            return view('user.restore_email');
        }
        
        $user->restore();
    }
}
```

## Solusi 3: Gunakan WithTrashed di Validasi Kolom Unik

> Solusi ketiga ini untuk menghandle agar tidak terjadi error database, email dari user yang disoft delete tetap tidak bisa digunakan oleh user lain.

Ketika validasi kolom unique, pastikan untuk mengikutsertakan data soft delete di query database. Yaitu dengan menambahkan method `withTrashed`. Contoh:

```php
<?php

use App\Models\User;

// User baru dengan email yang usernya sudah di-soft delete
$newUserEmail = 'jhon@gmail.com';

// Validasi email
$emailUsed = User::where('email', 'jhon@gmail.com')
	->withTrashed()
	->exists();

// Return 400
abort_if($emailUsed, 400, 'Email sudah digunakan');

// Validasi berhasil
User::create(['email' => 'jhon@gmail.com']);
```

## Solusi 4: Gunakan Unique Rule di Request Validation untuk Validasi Kolom Unik

`unique` rule di request validation secara otomatis mengikutsertakan data soft delete di query database. Sehingga tidak akan terjadi error database.

```php
<?php

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:users']
        ]);
    }
}
```

---

## Solusi Lain

Tentu ada solusi lain yang bisa digunakan seperti membuat expiration pada record yang yang disoft delete, membuat tabel arsip, dsb. Bisa dikembangkan sendiri sesuai kebutuhan.