---
slug: mkdir-rekursif
title: "Cara Membuat Direktori Secara Rekursif (di Linux dan PHP)"
description: "Cara rekursif adalah cara membuat direktori yang berada di dalam parent sekaligus membuat seluruh parentnya jika belum ada."
tag: [php, linux]
date: 2026-11-04
thumbnail: ./images/laravel-masalah-soft-delete-dan-solusinya/thumbnail.png
---

Cara rekursif adalah cara membuat direktori yang berada di dalam parent sekaligus membuat seluruh parentnya jika belum ada.

Di bash, gunakan perintah `mkdir` diikuti nama direktorinya dan tambahkan opsi `-p`.

```bash
mkdir projects/mygame/src -p

ls .
# projects
ls projects
# mygame
ls projects/mygame
# src
```

Di PHP, gunakan fungsi `mkdir` diikuti nama direktorinya, dan di parameter ketiga isi dengan `true` .

```php
<?php

mkdir('projects/mygame/src', 0777, true);
```

```bash
ls .
# projects
ls projects
# mygame
ls projects/mygame
# src
```

## Jika Tanpa Rekursif

Jika perintah-perintah di atas dilakukan tanpa rekursif, yang terjadi adalah error (jika ada direktori parent yang belum ada).

```bash
mkdir projects/mygame/src
# mkdir: cannot create directory ‘projects/mygame/src’: No such file or directory
```

```php
<?php

mkdir('projects/mygame/src', 0777);
# PHP Warning:  mkdir(): No such file or directory in /home/test/index.php on line 3
```

Solusinya, gunakan cara rekursif seperti contoh di atas.