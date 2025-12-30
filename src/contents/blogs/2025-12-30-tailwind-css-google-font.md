---
slug: tailwind-css-google-font
title: Cara Menggunakan Google Font di Tailwind CSS
description: Google Font adalah layanan dari Google yang menyediakan beragam font siap pakai.
tag: [font, tailwind]
date: 2025-12-30
thumbnail: ./images/tailwind-css-google-font/thumbnail.png
---

Google Font adalah layanan dari Google yang menyediakan beragam font siap pakai.

Berikut cara menggunakan Google Font di Tailwind CSS:

## 1. Menyiapkan Google Font

Buka [Google Font](https://fonts.google.com), lalu pilih font yang ingin digunakan. Misalnya [Google Sans Font](https://fonts.google.com/specimen/Google+Sans).

Copy embed codenya, pilih yang `@import`. Contoh:

```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');
```

Buka file css tempat tailwind diimport, lalu paste code `@import` font.

```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');

@import 'tailwindcss';
```

## 2. Menggunakan Font di Tailwind

Ada tiga cara untuk menggunakan font di Tailwind:

### 1. Mengganti Default Font

Untuk menggunakan Google Font sebagai default font, jadikan font sebagai variabel `--font-sans` di `@theme` directive.

Contoh:

```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');

@import 'tailwindcss';

@theme {
    --font-sans: "Google Sans", sans-serif;
}
```

### 2. Membuat Custom Class

Cara kedua adalah dengan membuat custom class. Custom class bisa ditambahkan langsung atau dibuat di dalam layer components.

Contoh:

```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');

@import 'tailwindcss';

.font-google-sans {
    font-family: "Google Sans", sans-serif;
}

/* Atau */

@layer components {
    .font-google-sans {
        font-family: "Google Sans", sans-serif;
    }
}
```

Cara menggunakannya adalah dengan menambahkan class `font-google-sans` ke elemen HTML. Contoh:

```html
<h1 class="font-google-sans">
    Judul Font Google Sans
</h1>
```

### 3. Menggunakan Arbitrary Value 

Cara terakhir adalah dengan arbitrary value. Syntaxnya:

```bash
font-['nama font']
```

Contoh:

```html
<h1 class="font-['Google Sans']">
    Judul Font Google Sans
</h1>
```
