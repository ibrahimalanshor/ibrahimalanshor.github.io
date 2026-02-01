---
slug: struktur-project-vue-js-yang-lebih-baik
title: Membuat Struktur Project di Vue JS yang Lebih Baik
description: Membuat struktur project di Vue JS yang lebih baik dengan feature based structure.
tag: [vue]
date: 2026-02-01
thumbnail: ./images/membuat-struktur-project-vue-js-lebih-baik/thumbnail.png
---

Ini struktur project Vue JS saya dulu:

```bash
src/
    components/
        product/
            ProductNewModal.vue
            ProductDeleteConfirm.vue
            ProductDetailModal.vue
        user/
            UserNewModal.vue
            UserDeleteConfirm.vue
            UserDetailModal.vue
    stores/
        product.store.js
        user.store.js
    views/
        product/
            ProductIndexPage.vue
        user/
            UserIndexPage.vue
```

Pada struktur di atas, file dikelompokan berdasarkan jenisnya: `Component`, `Store` dan `Views`.

Sekarang saya sudah beralih ke __feature based structure__, yaitu file dikelompokan berdasarkan fiturnya. Contoh:

```bash
src/
    features/
        product/
            components/
                ProductNewModal.vue
                ProductDeleteConfirm.vue
                ProductDetailModal.vue
            views
                ProductIndexPage.vue
            product.store.js
        user/
            components/
                UserNewModal.vue
                UserDeleteConfirm.vue
                UserDetailModal.vue
            views
                UserIndexPage.vue
            user.store.js
```

## Kenapa Feature Based Structure Lebih Baik?

Jawaban pertama: dalam membuat aplikasi Vue, saya selalu kerjakan per fitur, jadi setiap pengerjaan hanya __fokus pada satu folder saja__.

Contoh saya ingin membuat fitur `Sale`. Dengan feature based, saya hanya perlu membuat folder `sale` di dalam folder `features`, lalu fokus coding di dalam folder tersbut.

Jawaban kedua: dengan feature based, lebih mudah melakukan perubahan dan fixing pada suatu fitur. Karena semua file terkait fitur tersebut ada di __satu folder__, jadi tidak perlu cari di folder lain.

Intinya feature based structure lebih baik karena per fitur satu folder.
