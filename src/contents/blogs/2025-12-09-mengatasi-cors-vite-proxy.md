---
slug: mengatasi-cors-vite-dengan-proxy 
title: Mengatasi CORS di Vite dengan Menambahkan Proxy 
description: Masalah CORS sering terjadi ketika client dan server berbeda origin-nya dan server tidak mengizinkan origin browser untuk mengakses resource di server 
tag: [vite]
date: 2025-12-09
---

Masalah CORS sering terjadi ketika client dan server berbeda origin-nya dan server tidak mengizinkan origin browser untuk mengakses resource di server.

```javascript
// client serve di http://localhost:5173

const res = await fetch('http://localhost:8000/api/posts')

// ! Error CORS : http://localhost:5173 tidak boleh mengakses http://localhost:8000.
```

Untuk mengatasinya, kita perlu membuat origin client dan origin API seolah terlihat sama. Salah satu caranya dengan proxy.

Di Vite, kita bisa menambahkan proxy ke konfigurasi `server.proxy` di file `vite.config.js`. Contoh:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
```

Kode request ke API juga harus diubah, tidak perlu menuliskan origin server API-nya:

```javascript
// client serve di http://localhost:5173

const res = await fetch('/api/posts')

// Seharusnya sukses tanpa Error CORS
```

Dengan ini, setiap ada request ke `/api`, server Vite akan mengarahkan request ke `http://localhost:8000`.

Kenapa tidak muncul error CORS? Karena request dari client (`/api/posts`) mengarah ke origin client itu sendiri (`http://localhost:5173`), sehingga tidak terjadi error CORS. Request tersebut secara tersembunyi diteruskan ke `http://localhost:8000` oleh Vite server.

## server.proxy Hanya Aktif di Mode Development

Vite `server.proxy` hanya aktif di mode development, di mode production tidak akan aktif.

Jika client dan API di origin yang sama mungkin tidak akan terjadi masalah CORS.

Jika berbeda, kita bisa membuat `baseUrl` request API menjadi dinamis tergantung mode environment. Contoh:

```javascript
const baseUrl = import.meta.env.DEV
    ? '/api/v1'
    : import.meta.env.VITE_API_BASE_URL // http://server.com/api/v1

const res = await fetch(`${baseUrl}/posts`)
```

Dengan kode tersebut, ketika di development, request ke API akan menggunakan proxy, sedangkan di production request ke API akan langsung ke origin server yang ditulis di env variable.
