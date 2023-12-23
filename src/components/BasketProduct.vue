<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.color.gallery[0].file.url" width="120" height="120" :alt="item.title" />
    </div>
    <h3 class="product__title">{{ item.title }}</h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ backgroundColor: item.color.color.code }"></i>
        {{ item.color.color.title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.id }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="quantity > 1 && quantity--">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" :value="quantity" name="count" />

      <button type="button" aria-label="Добавить один товар" @click="quantity++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ numberFormat(item.price) }} ₽ </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script setup>
import { ref } from 'vue'
import { numberFormat } from '@/helpers'
const props = defineProps(['item'])
const quantity = ref(props.item.quantity)
</script>
