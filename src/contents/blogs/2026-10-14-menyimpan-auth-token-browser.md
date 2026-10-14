---
slug: menyimpan-auth-token-browser
title: "Cara Menyimpan Auth Token yang Aman di Browser"
description: "Auth token adalah string yang didapatkan setelah login untuk mengakses data di API, auth token bisa dicuri jika tidak disimpan dengan benar di browser."
tag: [web]
date: 2026-10-14
thumbnail: ./images/menyimpan-auth-token-browser/thumbnail.png
---

Auth token / access token / bearer token adalah string yang didapatkan setelah login untuk mengakses data di API.

Auth token disertakan ketika request ke API dengan header `Authorization` . Contoh:

```
Authorization: Bearer <token>
```

Kalau auth token sampai tercuri maka pencuri bisa mengakses ke API sebagai user tersebut tanpa login.

Ada empat langkah menyimpan auth token yang aman dari tercuri di browser:

1. Simpan auth token di memori.
2. Simpan login state di local storage.
3. Simpan refresh token di HTTP only cookie.
4. Ketika  refresh browser, lakukan refresh token untuk mengambil auth token baru.

Maka ada tiga data yang tempat penyimpanannya berbeda:

1. Auth token, di memory. Sulit dicuri dan hilang ketika refresh.
2. Login state, di local storage. Mudah dicuri tapi tidak ada manfaatnya.
3. Refresh token, di HTTP only cookie. Tidak bisa dicuri dan tetap ada sampai waktu yang ditentukan.

Data di memory sulit untuk dicuri dengan XSS.

Sedangkan data di local storage mudah dicuri dengan XSS. Maka dari itu datanya harus yang tidak bermanfaat bagi pencuri, seperti login state.

Data di HTTP only cookie tidak bisa dicuri dengan XSS, sehingga aman untuk menyimpan refresh token.

Auth token tidak perlu disimpan di HTTP only cookie agar request API tetap stateless tanpa cookie.

Berikut contoh implementasinya.

## Proses Login

Di sisi server, ketika login berhasil, kembalikan auth token di response dan kirim cookie refresh token dengan format HTTP only.

Auth token sebaiknya punya durasi kadaluarsa yang singkat, misalnya 15 menit. Sedangkan refresh token bisa lebih lama, misal 1 minggu.

Contoh implementasi login dengan Laravel:

```php
<?php

namespace App\Http\Controllers\Api\AuthController;

use Illuminate\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Cookie;

class AuthController
{
	public function login(Request $request)
	{
		$credentials = $request->validate([
			'email' => ['required', 'email'],
			'password' => ['required', 'string', 'min:8']
		]);
		
		// Validasi User
		abort_if(!Auth::attempt($credentials), 401, 'invalid credentials');
		$user = Auth::user();
		
		// Buat Refresh Token
		$refreshToken = $user->refreshTokens()
			->create(['token' => Str::random(32), 'expire_at' => now()->addWeek()]);
		
		// Kirim refresh token di cookie
		// Kirim auth token di response body
		return response()
			->cookie(
                name: 'refresh_token',
                value: $refreshToken->token,
                minutes: now()->diffInMinutes($refreshToken->expire_at),
                path: '/',
                domain: null,
                secure: true,
                httpOnly: true,
                raw: false,
                sameSite: Cookie::SAMESITE_LAX,
			)
			->json([
				'auth_token' => $user->createToken('api')->plainTextToken
			]);
	}
}
```

Di sisi browser, simpan auth token di memory dan login state (true) di local storage. Contoh di Vue.

```jsx
import { ref } from 'vue'

export const loggedIn = ref(localStorage.getItem('logged_in') === 'true')
export const authToken = ref(null)

export async function login(credentials) {
	const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
	})
	
	if (!res.ok) {
        throw new Error('invalid credentials')
	}
	
	const data = await res.json()
	
	loggedIn.value = true
	authToken.value = data.auth_token
	
	localStorage.setItem('logged_in', 'true')
}
```

## Request API

Di server, setiap endpoint API yang membutuhkan autentikasi harus memiliki token di header Authorization dengan format `Bearer <token>`.

Token kemudian dicek apakah ada di database sekaligus mendapatkan user dari token tersebut.

Di laravel, bisa menggunakan sanctum. Cukup dengan menambahkan middleware `auth:sanctum` di routes.

```php
<?php

use App\Http\Controllers\Api\AuthController\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/profile', [AuthController::class, 'getProfile'])
    ->middleware('auth:sanctum');
```

Di sisi client, setiap kali request ke API, sertakan auth token ke Authorization header jika user sudah login. Contoh.

```jsx
import { loggedIn, authToken } from './auth.js'

async function request(url) {
	const res = await fetch(url, {
		headers: loggedIn.value
			? { 'Authorization': `Bearer ${authToken.value}` }
			: {}
	})
	
	// handle response
}
```

## Refresh Token

Ketika halaman browser direfresh maka auth token di memory akan hilang.

Untuk mendapatkannya lagi perlu dilakukan refresh token ke server.

Refresh token hanya dilakukan jika ada login state di local storage.

```jsx
import { loggedIn, authToken } from './auth.js'

async function refreshToken() {
	const res = await fetch('/api/refresh-token', {
		method: 'POST'
	})
	
	if (!res.ok) {
		loggedIn.value = false
		localStorage.removeItem('logged_in')
		
		return;
	}
	
	const data = await res.json()
	
	authToken.value = data.auth_token
}
```

Di server, buat endpoint refresh token yang mengambil token dari cookie lalu divalidasi ke database. 

Jika valid maka buat auth token baru dan kirim ke client.

```php
<?php

namespace App\Http\Controllers\Api\AuthController;

use App\Models\RefreshToken;
use Illuminate\Http\Request;

class AuthController
{
	public function refreshToken(Request $request)
	{
		// Ambil refresh token dari cookie
		$refreshTokenCookie = $request->cookie('refresh_token');
		
		abort_if(!$refreshTokenCookie, 401);
		
		// Ambil refresh token dari database
		$refreshToken = RefreshToken::with('user')
			->firstWhere('token', $refreshTokenCookie);
		
		// validasi refresh token
		abort_if(!$refreshToken, 401);
		abort_if($refreshToken->expire_at->lessThan(now()), 401);
		
		// Buat Auth Token baru
		$authToken = $refreshToken->user->createToken('api')->plainTextToken;
		
		return response()
			->json([
				'auth_token' => $authToken
			]);
	}
}
```

## Package Pendukung

Saya sudah membuat package untuk memudahkan proses-proses di atas.

- Untuk autentikasi di server yang menggunakan Laravel dan Sanctum, bisa gunakan [fineauth](https://github.com/narakode/fineauth).
- Untuk mengelola autentikasi di Vue, bisa gunakan [vue-auth-helper](https://github.com/narakode/vue-auth-helper).

## Kesimpulan

Cara di atas adalah versi sederhana secara konsep yang biasa saya lakukan, tentu ada tambahan detail implementasi yang belum dijelaskan seperti:

- Auto refresh token ketika request error.
- Hapus auth token sebelumnya ketika refresh token.
- Logout.