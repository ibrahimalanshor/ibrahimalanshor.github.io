---
title: Fine Auth
summary: Package Laravel untuk Authentikasi Rest API
description: Package laravel untuk membuat autentikasi pada Rest API 
icon: twemoji:locked
order: 5
---

Autentikasi Rest API dengan Laravel sebagai backend membutuhkan beberapa endpoint dan mekanisme. Maka saya membuat package untuk kebutuhkan tersebut.

- Link Dokumentasi : [https://narakode.id/fineauth/](https://narakode.id/fineauth/)
- Link Repository : [https://github.com/narakode/fineauth](https://github.com/narakode/fineauth)

## Fitur

- Login
- Access Tokens
- Refresh Tokens
- Current Authenticated User

## Konsep

- Client hit endpoint `/login` dengan credentials (email dan password, bisa dicustom).
- Server validasi credentials, jika gagal server mengembalikan 401.
- Jika berhasil server mengembalikan objek berisi `access_token`, `user`, dan `meta` yang bisa dicustom.
- Jika berhasil server mengirim refesh token ke dalam cookie yang secure dengan `HttpOnly` cookie dan ada expiry time.
- Client mengakses routes yang membutuhkan autentikasi dengan menyisipkan `access_token` ke Authorization Bearer.
- Jika `access_token` expired, client melakukan `refresh_token`.
- Refresh Token melakukan validasi token di cookie, database dan expiry timenya.
- Jika berhasil server mengembalikan `access_token` yang baru.
- Client bisa mengamil data user dari `access_token` dengan mengakses endpoint `/me`.