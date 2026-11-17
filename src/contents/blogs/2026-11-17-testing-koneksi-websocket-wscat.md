---
slug: testing-koneksi-websocket-wscat
title: "Cara Testing Koneksi Web Socket Menggunakan wscat"
description: "wscat adalah tool yang dapat digunakan untuk testing koneksi web socket"
tag: [websocket]
date: 2026-11-17
thumbnail: ./images/testing-koneksi-websocket-wscat/thumbnail.png
---

Web Socket server sudah dideploy, bagaimana cara mengetestnya? Gunakan tool bernama [wscat](https://github.com/websockets/wscat).

Instal `wscat` menggunakan `npm` 

```bash
npm install -g wscat
```

Jalankan `wscat` ke alamat URL websocket server yang mau ditest.

```bash
wscat -c wss://myapp.com
```

Jika koneksi berhasil maka muncul pesan `Connected`. Kemudian kita bisa mengirim pesan interaktif.

```bash
wscat -c wss://myapp.com
Connected (press CTRL+C to quit)
< {"event":"pusher:connection_established","data":"{\"socket_id\":\"799068463.946697382\",\"activity_timeout\":30}"}
> ping
< {"event":"pusher:error","data":"{\"code\":4200,\"message\":\"Invalid message format\"}"}
> pong
< {"event":"pusher:error","data":"{\"code\":4200,\"message\":\"Invalid message format\"}"}
>
```

Jika koneksi gagal maka muncul pesan `error: <pesan>` dan pesan interaktif tidak bisa dilakukan.

```bash
wscat -c ws://localhost:8000
	error: connect ECONNREFUSED 127.0.0.1:8000
```

## Bisakah Test Koneksi Web Socket dengan CURL?

Bisa, tapi terbatas untuk testing websocket handshake saja. Pesan interaktif seperti  di `wscat` tidak bisa dilakukan.

Contoh:

```bash
curl -i --http1.1 \
  -H "Connection: Upgrade" \
  -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" \
  -H "Sec-WebSocket-Key: SGVsbG9Xb3JsZDEyMzQ1Ng==" \
  http://localhost:8090/app/YOUR_APP_KEY
```

Jika koneksi websocket berhasil, hasilnya seperti ini

```bash
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: qGEgH3En71di5rrssAZTmtRTyFk=
```

Jika koneksi gagal hasilnya seperti ini.

