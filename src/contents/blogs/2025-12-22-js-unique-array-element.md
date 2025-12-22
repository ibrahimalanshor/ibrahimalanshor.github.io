---
slug: js-unique-array-element 
title: Cara Menghapus Elemen Duplikat di Array JavaScript 
description: Focus-Visible hanya diberikan ketika elemen sedang focus dan membutuhkan indikator focus. 
tag: [javascript]
date: 2025-12-22
thumbnail: ./images/js-unique-array-element/thumbnail.png
---

Ada beberapa cara yang bisa digunakan untuk menghapus elemen yang duplikat di array JavaScript.

## 1. Menggunakan Set

Set adalah objek yang dapat menyimpan beberapa elemen secara unik.

Cara untuk menghapus elemen yang duplikat di array dengan Set adalah dengan mengubah array menjadi Set, lalu Set diubah kembali menjadi array yang sudah unik.

Untuk mengubah array menjadi Set, array bisa langsung dimasukkan ke dalam Set constructor.

Untuk mengubah Set menjadi array, gunakan spread operator (`...`).

Contoh:

```javascript
const nums = [1, 2, 2, 3, 5, 1]
const numsUnique = [...new Set(nums)]

console.log(numsUnique) // [1, 2, 3, 5]
```

## 2. Filter Elemen Duplikat

Cara lain adalah dengan memfilter elemen yang duplikat pada array.

Setiap elemen akan dicek index di iterasi dan index nilainya di dalam array dengan `indexOf`, jika berbeda maka elemen tersebut adalah duplikat.

Contoh:

```javascript
const nums = [1, 2, 2, 3, 5, 1]
const numsUnique = nums.filter((num, i) => nums.indexOf(num) === i) 

console.log(numsUnique) // [1, 2, 3, 5]
```

## Menghapus Elemen Duplikat di Array of Object

Untuk array yang berisi objek, gunakan cara kedua dengan filter tapi `indexOf` diubah dengan `findIndex` dan kondisi duplikatnya disesuaikan sesuai kebutuhan.

Contoh, array of object ini ingin dihapus yang `id`-nya duplikat.

```javascript
const users = [
    { id: 1, name: 'Ibrahim' },
    { id: 2, name: 'Jamal' },
    { id: 2, name: 'Oping' },
    { id: 3, name: 'Bush' },
    { id: 5, name: 'Amr' },
    { id: 1, name: 'Jude' },
]
const uniqueUsers = users.filter((user, index) =>
    users.findIndex(item => item.id === user.id) === index
)

console.log(uniqueUsers)
/* [
    { "id": 1, "name": "Ibrahim" },
    { "id": 2, "name": "Jamal" },
    { "id": 3, "name": "Bush" },
    { "id": 5, "name": "Amr" }
] */
```
