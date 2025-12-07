---
slug: js-random-array-element 
title: Cara Mendapatkan Random Array Element di Javascript 
description: Untuk mendapatkan random array element di javascript, kita bisa menggunakan Math.random() dan Math.floor() 
tag: [javascript]
date: 2025-12-07
---

Untuk mendapatkan random array element di JavaScript, gunakan cara berikut:

- Gunakan `Math.random()` untuk mendapatkan angka random dari 0 - 1.
- Kalikan angka random dengan ukuran array untuk mendapatkan random index dari 0 - ukuran index.
- Bulatkan hasil perkalian kebawah dengan `Math.floor` untuk mendapatkan index array yang valid.
- Gunakan hasilnya sebagai index untuk mendapatkan element yang random di array.

```js
const arr = [13, 998, 12321, 5, 32, 134]

const randomIndex = Math.floor(Math.random() * arr.length)
const randomElement = arr[randomIndex]

console.log(randomElement)
```

Jadikan fungsi:

```js
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

console.log(getRandomElement([13, 998, 12321, 5, 32, 134]))
```
