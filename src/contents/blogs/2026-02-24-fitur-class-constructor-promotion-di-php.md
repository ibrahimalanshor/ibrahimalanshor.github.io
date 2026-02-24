---
slug: fitur-class-constructor-promotion-di-php
title: Fitur Class Constructor Promotion di PHP
description: Class constructor promotion memungkinkan kita untuk mendeklarasikan properti class dan mengisi nilainya langsung di parameter constructor.
tag: [php]
date: 2026-02-24
thumbnail: ./images/fitur-class-constructor-promotion-di-php/thumbnail.png
---

Class constructor promotion adalah fitur baru di PHP versi 8.

Fitur ini memungkinkan kita untuk mendeklarasikan properti class dan mengisi nilainya langsung di parameter constructor.

Contoh tanpa constructor promotion:

```php
class User
{
	public string $name;
	
	public function __constuctor(string $name)
	{
		$this->name = $name;
	}
}
```

Contoh dengan construtor promotion:

```php
class User
{
	public function __constuctor(public string $name) {}
}
```

Kode jadi lebih ringkas.

Constructor promotion juga tetap bisa dikombinasikan dengan properti biasa. Contoh:

```php
class User
{
	public int $id;
	public int $uuid;
	
	public function __constuctor(public string $name, int $id)
	{
		$this->id = $id;
		$this->uuid = uuid();
	}
}
```
