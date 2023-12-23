<script setup>
import { ref, computed } from 'vue'
import { numberFormat } from '@/helpers'
const props = defineProps({
  item: {
    type: Object
  }
})
const currentColor = ref(props.item.colors[0].id)
const currentImage = computed(() => {
  const color = props.item.colors.find((color) => {
    return color.id == currentColor.value
  })
  if (color.gallery) return color.gallery[0].file.url
  return false
})
</script>
<template>
  <li class="catalog__item">
    <router-link :class="'catalog__pic'" :to="{ name: 'product', params: { id: item.id } }"
      ><img v-if="currentImage" :src="currentImage" :alt="item.title"
    /></router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: item.id } }"
        >{{ item.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ numberFormat(item.price) }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color of item.colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            v-model="currentColor"
            :value="color.id"
          />
          <span class="colors__value" :style="{ 'background-color': color.color.code }"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>
