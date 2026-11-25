---
slug: setup-login-ssh-tanpa-password
title: "Setup Login SSH Tanpa Password"
description: "wscat adalah tool yang dapat digunakan untuk testing koneksi web socket"
tag: [server]
date: 2026-11-25
thumbnail: ./images/setup-login-ssh-tanpa-password/thumbnail.png
---

SSH adalah cara aman untuk mengelola server dari jarak jauh (misal komputer sendiri).

Setiap kali login SSH, dibutuhkan user dan password.

Agar tidak perlu memasukkan password setiap kali login, kita bisa menggunakan **key based login**.

## Cara Kerja Key Based Login

Cara kerjanya adalah dengan kombinasi private dan public key.

- Private key disimpan di komputer local.
- Public key disimpan di server.

Analoginya, public key itu gembok dan private key adalah kuncinya.

Ketika login SSH, private key di komputer local dan public key di server akan dicocokkan.

Kalau cocok, login akan berhasil tanpa harus memasukkan password.

## 1. Membuat Public Key

Buat public key dengan perintah `ssh-keygen`.

```bash
ssh-keygen -t ed25519
```

Akan muncul dua prompt. 

Prompt pertama, masukkan nama file tempat key disimpan (lengkap dengan pathnya). Kosongkan jika ingin disimpan di tempat default.

```bash
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
```

> Disarankan untuk tetap memasukkan nama file, bisa jadi sudah ada public key di komputer Anda, sehingga public key tersebut tidak hilang.

> Tempat penyimpanan public key umumnya di `/home/user/.ssh/` .

> Nama file public key bebas.

Prompt kedua, masukkan password untuk public key (opsional). Kosongkan saja jika ingin tanpa password. 

```bash
Enter passphrase (empty for no passphrase):
```

Contoh output public key berhasil dibuat:

```bash
Your identification has been saved in /home/user/.ssh/myvps
Your public key has been saved in /home/user/.ssh/myvps.pub
The key fingerprint is:
SHA256:qOoqJFfbfnBFMZ6WFsZQZfy6WXTfcknQEd0B+quTjHw user@host
The key's randomart image is:
+---[RSA 2048]----+
|        .+*+o.o+*|
|         oo*o. .o|
|         .*. ..  |
|    .  . o. . o..|
|   . o. S.   +..+|
|... ..o .   . +.+|
|o.  .. o. o .= o |
|.  .  . .o E+    |
|ooo    .  ...    |
+----[SHA256]-----+
```

## 2. Copy Public Key ke Server

Salin public key ke server dengan perintah `ssh-copy-id`. Contoh:

```bash
ssh-copy-id user@ip -i lokasi_public_key
```

Contoh:

```bash
ssh-copy-id root@202.155.95.33 -i /home/user/.ssh/myvps
```

> `-i lokasi_public_key` tidak perlu ditambahkan jika public key disimpan di tempat default.

Masukkan password seperti biasa sampai berhasil masuk ke server.

Setelah masuk ke server, public key akan secara otomatis disimpan di server.

Contoh output berhasil:

```bash
Number of key(s) added: 1

Now try logging into the machine, with:
"ssh 'root@202.155.95.33"

and check to make sure that only the key(s) you wanted were added.
```

## 3. Test Login Tanpa Password

Setelah key tersalin di server, keluar dari SSH server.

Kemudian lakukan login ulang ke server dengan SSH.

```bash
ssh user@ip -i lokasi_public_key
```

Contoh:

```bash
ssh root@202.155.95.33 -i /home/user/.ssh/myvps
```

> `-i lokasi_public_key` tidak perlu ditambahkan jika public key disimpan di tempat default.
> 

Selamat! Login SSH berhasil tanpa password.

## Bonus: Login SSH Tanpa -i dan Tanpa IP

Jika file public key disimpan di tempat non-default, opsi `-i` harus selalu disertakan ketika login SSH.

Untuk mengatasinya tambahkan sebuah `config host`. 

Config host juga dapat digunakan untuk login SSH tanpa IP. Berikut caranya:

### Membuat Config Host SSH

Buka file `/home/user/.ssh/config` . Jika belum ada buat terlebih dahulu.

```bash
nano /home/user/.ssh/config
```

Tambahkan sebuah Host untuk SSH server dengan format berikut:

```bash
Host nama_server
    HostName ip_server
    User user_server
    IdentityFile lokasi_file_public_key
    IdentitiesOnly yes
```

`nama_server` digunakan untuk login SSH nanti. Diisi dengan teks bebas.

Contoh:

```bash
Host myvps
    HostName 202.155.95.33
    User root
    IdentityFile /home/user/.ssh/id_ed25519_vps1
    IdentitiesOnly yes
```

Simpan dan tutup file. Kemudian coba login SSH dengan perintah:

```bash
ssh nama_server
```

Contoh:

```bash
ssh myvps
```

Selamat, login SSH berhasil tanpa IP, tanpa password dan tanpa `-i`.

---

Sekian artikel tentang cara setup login SSH tanpa password, semoga bermanfaat.