---
slug: vue-component-v-model 
title: Cara Menambahkan v-model Pada Vue Component 
description: Untuk membuat `v-model` bisa digunakan di component, kita bisa menggunakan macro `defineModel` pada component 
tag: [vue]
date: 2025-12-13
---

`v-model` adalah direktif di Vue.Js untuk menyingkronkan nilai input dan data state secara otomatis.

Untuk membuat `v-model` bisa digunakan di component, kita bisa menggunakan macro `defineModel` pada component.

Contoh pada component `IncrementButton.vue`:

```vue
<!-- IncrementButton.vue -->
<script setup>
const count = defineModel()
</script>

<template>
    <button @click="count++">{{ count }} - Increment</button>
</template>
```

Component `IncrementButton` sekarang sudah bisa menerima `v-model` ketika digunakan.

Contoh digunakan di `App.vue`:

```vue
<!-- App.vue -->
<script setup>
import { ref } from 'vue'
import IncrementButton from './components/IncrementButton.vue'

const currentValue = ref(0)
</script>

<template>
    <IncrementButton v-model="currentValue" />
    <p>Nilai saat ini : {{ currentValue }}</p>
</template>
```

Hasilnya, nilai `currentValue` di `App.vue` dan nilai `count` di `IncrementButton.vue` akan otomatis selalu sinkron.

## Untuk Vue.Js Versi Sebelum 3.5

Macro `defineModel` baru bisa digunakan di versi 3.5 ke atas.

Untuk versi sebelum itu, cara menambahkan `v-model` di component adalah dengan menggunakan props `modelValue` dan emit `update:modelValue`.

Props `modelValue` digunakan untuk mengambil data yang dimasukkan ke `v-model`, emit `update:modelValue` digunakan untuk memperbarui data yang dimasukkan ke `v-model`.

Contoh pada component `IncrementButton.vue`:

```vue
<!-- IncrementButton.vue -->
<script setup>
defineProps({ modelValue: Number })
defineEmits(['update:modelValue'])
</script>

<template>
    <button @click="$emit('update:modelValue', modelValue + 1)">
        {{ modelValue }} - Increment
    </button>
</template>
```
