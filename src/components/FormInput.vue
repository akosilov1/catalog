<script setup>
import { computed, defineProps } from 'vue'
import orderStore from '@/store/order.js'
const order = orderStore()

const props = defineProps(['type', 'title', 'placeholder', 'name'])
const inputValue = computed({
  get() {
    return order.orderData[props.name]
  },
  set(value) {
    order.orderData[props.name] = value
  }
})
</script>

<template>
  <label class="form__label">
    <textarea
      v-if="type === 'textarea'"
      class="form__input form__input--area"
      v-model="inputValue"
      :placeholder="placeholder"
    />
    <input
      v-else
      class="form__input"
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
    />
    <span class="form__value">{{ title }}</span>
    <span class="form__error">{{ order.orderError[name] }}</span>
  </label>
</template>
