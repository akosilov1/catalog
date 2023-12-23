<template>
  <RouterLink :class="'header__cart'" :to="{ name: 'basket' }">
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ count }}
    </span>
  </RouterLink>
</template>
<script setup>
import { computed } from 'vue'
import { basketStore } from '@/store/basket'

const basket = basketStore()
const count = computed(() => {
  return basket.count
})
</script>
