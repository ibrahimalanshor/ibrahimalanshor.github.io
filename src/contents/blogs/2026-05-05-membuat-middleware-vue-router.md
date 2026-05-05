---
slug: membuat-middleware-vue-router
title: "Cara Membuat Middleware di Vue Router"
description: Middleware di router adalah fungsi yang otomatis dipanggil ketika suatu route/halaman hendak diakses, untuk autentikasi, cek role permission, logging, dsb.
tag: [vue]
date: 2026-05-05
thumbnail: ./images/membuat-middleware-vue-router/thumbnail.png
---

Middleware di router adalah fungsi yang otomatis dipanggil ketika suatu route/halaman hendak diakses.

Middleware biasa digunakan untuk beberapa hal berikut:

- Mengecek autentikasi, jika halaman butuh autentikasi sedangkan user belum login maka middleware mengarahkan user ke halaman login.
- Mengecek role dan permission, jika halaman butuh role atau permission tertentu sedangkan user tidak memilikinya maka middleware mengarahkan ke halaman 403 atau 404.
- Logging, mencatat setiap perubahan halaman.

Di Vue Router, middleware bisa dibuat dengan [Navigation Guard](https://router.vuejs.org/guide/advanced/navigation-guards.html).

Contoh, disini kita membuat middleware autentikasi, berikut flownya:

1. Cek apakah halaman butuh autentikasi.
2. Jika butuh, ambil login state.
3. Jika login state nilainya `false` maka redirect ke halaman login.

Berikut langkah-langkah membuat middleware autentikasi di vue router:

## 1. Membuat Fungsi Middleware

Pertama, buat fungsi middleware di sebuah file baru. Misalnya di `src/router/guards/auth.guard.js`.

```jsx
export function authGuard(to, from) {
    // logic middleware
}
```

Fungsi middleware akan menerima dua parameter, `to` dan `from`.

- `to` adalah objek berisi data route dari halaman tujuan yang hendak diakses.
- `from` adalah objek berisi data route dari halaman saat ini.

Di dalam middleware, cek apakah halaman membutuhkan autentikasi. Caranya dengan mengecek meta dari route halaman tujuan.

Jika di meta tersebut ada key `auth` bernilai true maka halaman tersebut membutuhkan autentikasi.

```jsx
export function authGuard(to, from) {
	if (to.meta.auth) {
		// cek login state
	}
}
```

Ambil state login dari store/local storage sesuai tempat menyimpan login state. Misalnya dari local storage.

```jsx
export function authGuard(to, from) {
	if (to.meta.auth) {
		const loggedIn = localStorage.getItem('loggedIn') === 'true'
		
		if (!loggedIn) {
			// redirect ke login
		}
	}
}
```

Jika state login bernilai `false` maka redirect ke halaman login.

Cara redirect di middleware adalah dengan me-return objek berisi deskripsi tujuan routenya. Misalnya nama route-nya. Contoh:

```jsx
export function authGuard(to, from) {
	if (to.meta.auth) {
		const loggedIn = localStorage.getItem('loggedIn') === 'true'
		
		if (!loggedIn) {
			return { name: 'login' }
		}
	}
}
```

Kode di atas bisa disederhakan jadi seperti berikut:

```jsx
export function authGuard(to, from) {
	if (to.meta.auth && localStorage.getItem('loggedIn') !== 'true') {
		return { name: 'login' }
	}
}
```

## 2. Registrasi Middleware ke Router

Lanjut, registrasi middleware ke Vue Router.

Buka file tempat Vue Router dibuat, misalnya di `src/router/router.js`.

```jsx
import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
	routes: [
		// daftar routes
	],
	history: createWebHistory()
})

export { router }
```

Import file middleware yang sudah dibuat.

```jsx
import { authGuard } from './guards/auth.guard.js'
```

Registrasi middleware ke router, caranya dengan memanggil method `beforeEach` di router dengan memasukkan middleware-nya.

```jsx
router.beforeEach(authGuard)
```

Hasil akhir file `router.js`.

```jsx
import { createWebHistory, createRouter } from 'vue-router'
import { authGuard } from './guards/auth.guard.js'

const router = createRouter({
	routes: [
		// daftar routes
	],
	history: createWebHistory()
})

router.beforeEach(authGuard)

export { router }
```

## 3. Menambahkan Middleware ke Route Halaman

Tambahkan middleware `auth` ke route yang ingin diproteksi dengan autentikasi.

Caranya adalah dengan menambahkan objek meta dengan properti `auth: true`.  Contoh:

```jsx
import { createWebHistory, createRouter } from 'vue-router'
import { authGuard } from './guards/auth.guard.js'

const router = createRouter({
	routes: [
		{
			path: '/',
			name: 'dashboard',
			meta: { auth: true },
			component: () => import ('../components/Dashboard.vue')
		}
	],
	history: createWebHistory()
})

router.beforeEach(authGuard)

export { router }
```

## 4. Mencoba Middleware

Setelah middleware ditambahkan, coba akses halaman `/dashboard` dengan kondisi belum login. Maka halaman otomatis akan dialihkan ke halaman `/login`.

---

Itu saja cara membuat middleware di vue router, untuk membuat middleware lain bisa ikuti langkah-langkah di atas.