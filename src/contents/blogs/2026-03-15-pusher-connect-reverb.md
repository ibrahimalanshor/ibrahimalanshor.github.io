---
slug: cara-connect-pusher-js-ke-laravel-reverb
title: Cara Connect Pusher JS ke Laravel Reverb
description: Laravel Reverb adalah package laravel untuk membuat server broadcast, pusher adalah library javascript untuk menghubungkan ke laravel reverb.
tag: [php]
date: 2026-03-15
thumbnail: ./images/laravel-reverb-connect-pusher-js/thumbnail.png
---

Untuk menghubungkan pusher di client ke server reverb, kita tetap bisa menggunakan library `pusher-js`, dengan tambahan beberapa properti, yaitu:

1. `wsHost`: host server reverb
2. `wsPort`: port server reverb

Contoh:

```js
import Pusher from 'pusher-js'

const REVERB_APP_KEY = '302310231'
const REVERB_HOST = 'localhost'
const REVERB_PORT = 8080

const pusher = new Pusher(REVERB_APP_KEY, {
	cluster: '',
	wsHost: REVERB_HOST,
	wsPort: REVERB_PORT
})
```

Untuk mencoba di lokal, biasanya tidak perlu menggunakan TLS, maka bisa dinonaktifkan dengan `forceTLS: false` .

```js
import Pusher from 'pusher-js'

const REVERB_APP_KEY = '302310231'
const REVERB_HOST = 'localhost'
const REVERB_PORT = 8080

const pusher = new Pusher(REVERB_APP_KEY, {
	cluster: '',
	wsHost: REVERB_HOST,
	wsPort: REVERB_PORT,
	forceTls: false
})
```
