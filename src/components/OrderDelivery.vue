<script setup>
import orderStore from '@/store/order.js'
import { computed } from 'vue'
const order = orderStore()
const deliveries = computed(() => {
  return order.delivery
})
const orderDelivery = computed({
  get() {
    return order.orderDelivery
  },
  set(value) {
    order.orderDelivery = value
    order.getPayments(value)
  }
})
</script>

<template>
  <h3 class="cart__title">Доставка</h3>
  <ul class="cart__options options">
    <li class="options__item" v-for="(deliv, index) of deliveries" :key="deliv.id">
      <label class="options__label">
        <input
          class="options__radio sr-only"
          type="radio"
          v-model="orderDelivery"
          :value="deliv.id"
        />
        <span class="options__value">
          {{ deliv.title }} <b>{{ deliv.price }}</b>
        </span>
      </label>
    </li>
  </ul>
</template>
