---
slug: cara-memajukan-memundurkan-tanggal-mysql
title: Cara Memajukan dan Memundurkan Tanggal di MySQL
description: Memajukan dan memundurkan tanggal ke interval tertentu di mysql bisa dilakukan dengan fungsi DATE_ADD dan DATE_SUB
tag: [php]
date: 2026-03-31
thumbnail: ./images/memajukan-memundurkan-tanggal-mysql/thumbnail.png
---

Memajukan dan memundurkan tanggal ke *interval* tertentu di mysql bisa dilakukan dengan fungsi `DATE_ADD` dan `DATE_SUB`.

## Memajukan Tanggal di MySQL

Untuk memajukan tanggal di MySQL, gunakan fungsi `DATE_ADD`. Syntaxnya:

```jsx
DATE_ADD(tanggal, INTERVAL jumlah jenis_inverval)
```

Contoh:

```jsx
DATE_ADD(created_at, INTERVAL 1 DAY)
```

Contoh digunakan di operasi update data:

```jsx
UPDATE orders
SET created_at = DATE_ADD(created_at, INTERVAL 1 DAY);
```

Daftar jenis interval:

- MICROSECOND
- SECOND
- MINUTE
- HOUR
- DAY
- WEEK
- MONTH
- QUARTER
- YEAR
- SECOND_MICROSECOND
- MINUTE_MICROSECOND
- MINUTE_SECOND
- HOUR_MICROSECOND
- HOUR_SECOND
- HOUR_MINUTE
- DAY_MICROSECOND
- DAY_SECOND
- DAY_MINUTE
- DAY_HOUR
- YEAR_MONTH

## Memundurkan Tanggal di MySQL

Untuk memundurkan tanggal di MySQL, gunakan fungsi `DATE_SUB`. Syntaxnya:

```jsx
DATE_SUB(tanggal, INTERVAL jumlah jenis_inverval)
```

Contoh:

```jsx
DATE_SUB(created_at, INTERVAL 1 DAY)
```

Contoh digunakan di operasi update data:

```jsx
UPDATE orders
SET created_at = DATE_SUB(created_at, INTERVAL 1 DAY);
```

Daftar jenis interval pada `DATE_SUB` sama dengan di `DATE_ADD`.
