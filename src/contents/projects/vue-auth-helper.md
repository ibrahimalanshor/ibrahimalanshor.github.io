---
title: Vue Auth Helper
summary: Package Vue untuk Mengelola Autentikasi pada Rest API
description: Package Vue untuk mengelola autentikasi pada Rest API 
icon: twemoji:locked
order: 4
---

Autentikasi di Vue ke Rest API biasanya terdiri dari pengelolaan akses token, guard route, expiry, dsb. Maka saya membuat package untuk kebutuhan tersebut.

- Link Dokumentasi : [https://narakode.id/vue-auth-helper/](https://narakode.id/vue-auth-helper/)
- Link Repository : [https://github.com/narakode/vue-auth-helper](https://github.com/narakode/vue-auth-helper)

## Fitur

- Managemen logged in status, akses token, current user, meta, expiry time secara global dan reactive.
- Beberapa helper seperti login, logout, cek token expiry. 
- Guard untuk memproteksi halaman yang membutuhkan auth dan yang harus guest.