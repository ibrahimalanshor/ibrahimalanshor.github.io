---
slug: setup-linter-prettier-vue-project 
title: Setup Linter dan Prettier Untuk Project Vue 
description: Linter adalah tool untuk menganalisis kode, prettier adalah tool untuk memformat kode 
tag: [vue, linter]
date: 2025-12-05
---

Linter adalah tool untuk menganalisis kode, fungsinya untuk menemukan syntax error dan bug. Sehingga kode lebih berkualitas. Linter yang biasa saya gunakan di project Vue adalah [ESLint](https://eslint.org/).

[Prettier](https://prettier.io/) adalah tool untuk memformat kode agar lebih rapi sesuai standar.

Berikut langkah-langkah setup linter dan prettier untuk project Vue.

## Setup ESLint

Instal dan setup ESLint secara interaktif dengan menjalankan perintah berikut di terminal project Vue.

```bash
npm init @eslint/config@latest
```

Akan muncul beberapa prompt dengan beberapa opsi, contoh isian:

```bash
@eslint/create-config: v1.11.0

✔ What do you want to lint? · javascript
✔ How would you like to use ESLint? · syntax
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · Browser
```

Setelah berhasil, akan muncul file `eslint.config.js`, tempat konfigurasi ESLint, isinya seperti berikut:

```js
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs["flat/essential"],
]);
```

Baca [Dokumentasi konfigurasi ESLint](https://eslint.org/docs/latest/use/configure/).

## Setup Prettier

Install Prettier dengan menjalankan perintah berikut:

```bash
npm install --save-dev --save-exact prettier
```

Buat file `.prettierrc` untuk konfigurasi Prettier. Jalankan perintah berikut:

```bash
node --eval "fs.writeFileSync('.prettierrc','{\n\t\"singleQuote\": true\n}\n')"
```

Baca [Dokumentasi konfigurasi Prettier](https://prettier.io/docs/options).

## Setup Lint-Staged

Lint-Staged adalah tool untuk menjalankan linter pada kode yang berada di fase git staged.

Fase git staged adalah file yang sudah dimasukkan ke perintah `git add` tapi belum dicommit.

Fungsi Lint-Staged adalah agar linter hanya dijalankan ke file yang sudah diubah dan siap dicommit saja.

Jalankan perintah berikut untuk menginstal Lint-Staged:

```bash
npm install --save-dev lint-staged
```

Kemudian tambahkan konfigurasi lint-staged di `package.json`. 

```json
{
  "lint-staged": {
    "*.{vue,js,ts,css,md}": "prettier --write",
    "*.{vue,js,ts}": "eslint --cache --fix"
  }
}
```

Konfigurasi tersebut untuk menjalankan linter dan prettier pada file `vue,js,ts,css,md` yang berada di fase staged.

## Setup Husky

Husky adalah tool untuk membuat skrip yang otomatis dijalankan pada saat menjalankan perintah git tertentu. 

Saya biasanya menggunakan Husky untuk menjalankan Lint-Staged secara otomatis ketika perintah git commit dijalankan, sehingga tidak perlu manual menjalankan linter dan prettier.

Menjalankan Lint-Staged sebelum dicommit juga memastikan bahwa kode yang dicommit sudah dianalisis dan diformat.

Jalankan perintah berikut untuk menginstal Husky:

```bash
npm install --save-dev husky
```

Buat skrip husky dengan menjalankan perintah berikut:

```bash
npx husky init
```

Akan ada file baru di `.husky/pre-commit`. Buka file tersebut, hapus isinya dan diganti dengan skrip berikut untuk menjalankan Lint-Staged.

```bash
lint-staged
```

## Test

Sekarang test apakah konfigurasi linter dan prettier sudah berhasil di project Vue. Edit salah satu file Vue, lalu masukkan ke `git add` dan lakukan `git commit`.

Jika berhasil maka akan muncul proses linter dan prettier pada code yang sedang dicommit.

```bash
✔ Backed up original state in git stash (c27c125)
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
```

Jika tidak muncul maka coba ulangi langkah-langkah di atas.
