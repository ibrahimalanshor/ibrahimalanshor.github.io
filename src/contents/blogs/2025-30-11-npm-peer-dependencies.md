---
slug: npm-peer-dependencies
title: Apa Itu Peer Dependencies di NPM 
description: A simple explanation of the peerDependencies field in the package.json file
tag: [nodejs]
date: 2025-11-30
---

Peer dependencies adalah package yang dibutuhkan oleh package lain tapi harus diinstal di proyek yang menggunakan package lain tersebut.

Contohnya pada package [Buefy](https://github.com/buefy/). Package ini membutuhkan package `vue` versi tiga ke atas yang harus diinstal di proyek yang menggunakan package `buefy`.

```json
{
    "peerDependencies": {
        "vue": "^3.0.0"
    },
}
```

Jika `vue` sudah diinstal di proyek tapi versinya di bawah 3, maka akan error.

```bash
npm ERR! peerinvalid The package does not satisfy its siblings' peerDependencies requirements!
```

Jika `vue` sudah diinstal di proyek dan versinya sesuai, maka `vue` tidak akan diinstal ulang.

Jika `vue` belum diinstal di proyek, maka `vue` versi tiga akan diinstal ke proyek.


## Apa Bedanya dengan dependencies?

Kalau di dependencies, jika package yang dibutuhkan sudah diinstal di proyek tapi versinya beda, maka tidak akan muncul error. Tetapi package tersebut akan diinstal dengan versi yang dibutuhkan di dalam package lain. Contoh:

```bash
├── vue@2.0.0 
└─┬ buefy@3.0.0
  └── vue@3.0.0 
```

Ketika proyek dijalankan kemungkinan besar akan error, karena ada dua `vue` dengan versi yang berbeda.

## Contoh Penggunaan

Misalnya kita ingin membuat package untuk `vue`. Package ini harus menggunakan `vue` minimal versi tiga. Maka `vue` harus diletakan di `peerDependencies`.

```json
{
    "name": "my-vue-lib",
    "peerDependencies": {
        "vue": "^3.0.0"
    },
}
```

Dengan ini, jika ada proyek yang menggunakan `vue` versi dua ingin menginstal package ini, maka akan error.

Fungsinya untuk memastikan package yang kita buat hanya bisa berjalan di `vue` minimal versi tiga.
