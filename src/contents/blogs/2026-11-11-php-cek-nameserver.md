---
slug: php-cek-nameserver
title: "Cara Cek Nameserver Domain di PHP"
description: "Cek nameserver domain bisa dilakukan di PHP dengan method dns_get_record"
tag: [php]
date: 2026-11-11
thumbnail: ./images/php-cek-nameserver/thumbnail.png
---

Ketika ada customer yang membeli paket hosting di tempat saya, maka customer bisa menggunakan domain yang dia beli di tempat lain.

Caranya, customer perlu mengarahkan nameserver domain miliknya ke nameserver hosting yang baru saja dibeli.

Untuk mengecek apakah nameserver domain customer sudah mengarah ke hosting saya, saya membuat schedule secara berkala dengan php script.

Caranya dengan menggunakan function `dns_get_record`.

- Parameter pertama isi dengan nama domain.
- Parameter kedua isi dengan konstanta `DNS_NS`. Untuk mengambil semua nameserver domain.

```php
<?php

$domain = "yaman.com";

$records = dns_get_record($domain, DNS_NS);

print_r($records);
```

Contoh hasilnya.

```bash
Array
(
    [0] => Array
        (
            [host] => yaman.com
            [class] => IN
            [ttl] => 0
            [type] => NS
            [target] => ns5.worldnic.com
        )

    [1] => Array
        (
            [host] => yaman.com
            [class] => IN
            [ttl] => 0
            [type] => NS
            [target] => ns6.worldnic.com
        )

)
```

URL nameserver diambil dari key `target`.

## Mengecek Nameserver Terpasang

Hasil dari nameserver kemudian dibandingkan dengan nameserver hosting yang ingin dipakai ke domain.

```php
<?php

$domain = "yaman.com";

$records = dns_get_record($domain, DNS_NS);
$found = array_column($records, 'target');

$expectsRecords = ['ns1.myserver.com', 'ns2.myserver.com'];

$match = array_all($expectsRecords, function ($value) use ($found) {
    return in_array($value, $found);
});

var_dump($match);
// bool(true) jika match
// bool(false) jika tidak match
```