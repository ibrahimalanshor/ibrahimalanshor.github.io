---
slug: styling-input-file-tailwind
title: "Cara Styling Input File dengan Tailwind CSS"
description: Input file memilki style bawaan browser. Stylenya berbeda-beda. Tapi kita bisa styling input file dengan CSS, sehingga tampilannya menjadi konsisten di semua browser.
tag: [html, tailwind]
date: 2026-06-22
thumbnail: ./images/styling-input-file-tailwind/thumbnail.png
---

![Hasil styling input file](./images/styling-input-file-tailwind/input-file-hasil.png)

Input file memilki style bawaan browser. Stylenya berbeda-beda.

Namun kita bisa styling input file dengan CSS, sehingga tampilannya menjadi konsisten di semua browser.

Lebih mudah lagi dengan tailwind, yang sudah menyediakan utility class untuk styling file input.

Berikut langkah-langkah pembuatanya:

## 1. Styling Input File Bagian Luar

Pertama styling input file bagian luar atau kotak inputnya. Yaitu dengan menambahkan padding, border dan border radius.

```html
<input type="file" class="pr-3 border border-gray-300 rounded-md" />
```

Perhatikan, untuk padding left tidak diberi nilai karena itu untuk tempatnya label `Choose File`.

Hasilnya:

![Styling input file bagian luar](./images/styling-input-file-tailwind/input-file-box.png)

## 2. Styling Label “Choose File”

Selanjutnya styling label “Coose File” dengan `file` variant. Tambahkan class tinggi, padding, margin, backround dan border right. 

```html
<input type="file" class="pr-3 border border-gray-300 rounded-md file:h-full file:px-3 file:py-2 file:mr-3 file:bg-gray-100 file:border-r file:border-gray-300" />
```

Hasilnya:

![Hasil styling input file](./images/styling-input-file-tailwind/input-file-hasil.png)

---

Demikian cara stying input file dengan tailwind css. Untuk lebih lanjut bisa baca di [TailwindCSS - Hover, focus, and other states](https://tailwindcss.com/docs/hover-focus-and-other-states#file).

Baca juga [Cara Membuat Preview Gambar pada Input File](/blog/membuat-preview-gambar-input-file/).