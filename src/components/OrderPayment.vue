<script setup>
import orderStore from '@/store/order'
import { computed } from 'vue'
const order = orderStore()
const payments = computed(() => {
  return order.payments
})

const orderPayment = computed({
  get() {
    return order.orderPayment
  },
  set(value) {
    console.log(value)
    order.orderPayment = value
  }
})
</script>
<template>
  <h3 class="cart__title">Оплата</h3>
  <ul class="cart__options options">
    <li class="options__item" v-for="pay of payments" :key="pay.id">
      <label class="options__label">
        <input class="options__radio sr-only" type="radio" :value="pay.id" v-model="orderPayment" />
        <span class="options__value"> {{ pay.title }} </span>
      </label>
    </li>
  </ul>
</template>
