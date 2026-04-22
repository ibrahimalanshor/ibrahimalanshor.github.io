---
slug: back-button-hijacking-seo
title: "Back Button Hijacking: Praktik Spam yang Dapat Memengaruhi SEO"
description: Back Button Hijacking adalah praktek untuk memanipulasi tombol back pada browser sehingga tidak berfungsi seperti seharusnya. Praktek ini dapat menurunkan kualitas SEO pada website.
tag: [seo]
date: 2026-04-22
thumbnail: ./images/back-button-hijacking-seo/thumbnail.png
---

Back Button Hijacking adalah praktek untuk memanipulasi tombol back pada browser sehingga tidak berfungsi seperti seharusnya.

Seharusnya, ketika tombol back diklik, maka browser kembali ke halaman sebelumnya.

Dengan back button hijacking, yang terjadi:

1. Diarahkan ke halaman lain, misalnya iklan, dll.
2. Dibuat tidak berfungsi jadi tetap di halaman itu saja.

## Google Menggapnya Spam dan Malicious Practice

Google secara eksplisit menggangap back button hijacking sebagai **spam** dan **malicious practice**.

Malicious practice adalah praktek menipu user yang menyebabkan ketidaksesuaian antara ekpsektasi user dengan yang terjadi.

## Dampak Bagi Website

Dampak bagi website yang terdeteksi melakukan back button hijacking:

1. Turun rangking di hasil pencarian.
2. Halaman hilang dari hasil pencarian (deindexing).
3. Trafik turun.

## Cara Cek Website Apakah Terdapat Back Button Hijacking

1. Buka salah satu halaman di website (atau beberapa halaman).
2. Tekan tombol back.
3. Jika browser kembali ke halaman sebelumnya maka website terbebas dari back button hijacking.

## Cara Mengatasi Back Button Hijacking pada Website

Back button hijacking dilakukan dengan menambahkan script javascript, berikut cara untuk mengatasinya:

1. Buka semua file javascript yang digunakan di website.
2. Cek apakah ada kode yang seperti berikut:

```jsx
window.onpopstate = function () {
    location.href = "/iklan.html";
};
```

Atau:

```jsx
history.replaceState(null, null, location.href);
```

Atau

```jsx
history.pushState({}, "", location.href);
```

1. Hapus kode-kode tersebut.
2. Cek juga dari library pihak ketiga yang digunakan di website.
3. Cek kembali untuk memastikan back button hijacking sudah tidak ada.

## Sumber:

[Google Search Central Blog - Introducing a new spam policy for "back button hijacking"](https://developers.google.com/search/blog/2026/04/back-button-hijacking)
