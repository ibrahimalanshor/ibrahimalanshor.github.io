---
slug: vitest-mocking-localstorage
title: "Cara Testing Local Storage di Vitest Tanpa Install JSDOM"
description: Pada testing environment objek/variabel localStorage tidak bisa diakses, baik secara langsung atau melalui window.localStorage.
tag: [testing]
date: 2026-07-29
thumbnail: ./images/vitest-mocking-localstorage/thumbnail.png
---

Pada testing environment objek/variabel `localStorage` tidak bisa diakses, baik secara langsung atau melalui `window.localStorage`.

Solusinya adalah menginstall `jsdom`.

Alternatif tanpa perlu menginstall `jsdom` adalah membuat mocking `localStorage`.

Alternatif ini tentu lebih sederhana, cepat dan ringan. Berikut caranya:

## 1. Buat Objek Mocking Local Storage

Buat file baru untuk mocking local storage, misalnya di `test/setups/localStorage.ts`.

Kemudian buat objek untuk mocking `localStorage` . Isinya seperti berikut:

```ts
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem(key: string) {
    return this.store[key] ?? null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value;
  },
  removeItem(key: string) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};
```

Kemudian masukkan objek mocking tersebut ke dalam global stub vitest. Contoh:

```ts
import { vi } from 'vitest';

const localStorageMock = {
  store: {} as Record<string, string>,
  getItem(key: string) {
    return this.store[key] ?? null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value;
  },
  removeItem(key: string) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};

vi.stubGlobal('localStorage', localStorageMock);
```

## 2. Load Mocking ke Test Setup Files

Tambahkan file mocking yang sudah dibuat ke test setup files, di config vitest (`vitest.config.ts`). Contoh:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./test/setups/localStorage.ts'],
  },
});
```

## 3. Test Local Storage

Contoh ada file `auth.ts` yang menggunakan local storage.

```ts
export function login() {
  localStorage.setItem('logged_in', 'true')
}
```

Contoh testnya:

```ts
import { test } from 'vitest'
import { login } from './auth' 

test('init logged in state from local storage', () => {
  login()
  
  expect(localStorage.getItem('logged_in')).toBe('true')
})
```

Karena local storage yang dibuat bersifat global, maka sebaiknya direset pada setiap test.

```ts
beforeEach(() => {
  localStorage.clear();
});
```