<script setup>
import { basketStore } from '@/store/basket'
import orderStore from '@/store/order'
import { numberFormat } from '@/helpers'
import { ref, computed } from 'vue'

const order = orderStore()
const basket = basketStore()

order.getDelivery().then(() => {
  order.getPayments(order.delivery[0].id)
})

const deliveries = computed(() => {
  order.getPayments(orderData.value.delivery)
  return order.delivery
})

const payments = computed(() => {
  return order.payments
})
const orderData = ref({})

function addOrder() {
  const data = {
    name: orderData.value.name,
    address: orderData.value.address,
    phone: orderData.value.phone,
    email: orderData.value.email,
    deliveryTypeId: orderData.value.delivery,
    paymentTypeId: orderData.value.payment,
    comment: orderData.value.comment
  }
  order.add(data)
}
</script>
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink :to="{ name: 'catalog' }" :class="'breadcrumbs__link'">Каталог</RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink :to="{ name: 'basket' }" :class="'breadcrumbs__link'">Корзина</RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit="addOrder">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label">
              <input
                class="form__input"
                type="text"
                v-model="orderData.name"
                placeholder="Введите ваше полное имя"
              />
              <span class="form__value">ФИО</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="text"
                v-model="orderData.address"
                placeholder="Введите ваш адрес"
              />
              <span class="form__value">Адрес доставки</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="tel"
                v-model="orderData.phone"
                placeholder="Введите ваш телефон"
              />
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="email"
                v-model="orderData.email"
                placeholder="Введи ваш Email"
              />
              <span class="form__value">Email</span>
            </label>

            <label class="form__label">
              <textarea
                class="form__input form__input--area"
                v-model="orderData.comment"
                placeholder="Ваши пожелания"
              ></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="(deliv, index) of deliveries" :key="deliv.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    v-model="orderData.delivery"
                    :checked="index === 0"
                    :value="deliv.id"
                  />
                  <span class="options__value">
                    {{ deliv.title }} <b>{{ deliv.price }}</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="(pay, index) of payments" :key="pay.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    :value="pay.id"
                    v-model="orderData.paymentTypeId"
                    :checked="index === 0"
                  />
                  <span class="options__value"> {{ pay.title }} </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product of basket.basket" :key="product.id">
              <h3>{{ product.product.title }}</h3>
              <b>{{ product.price }} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>бесплатно</b></p>
            <p>
              Итого: <b>{{ basket.count }}</b> товара на сумму
              <b>{{ numberFormat(basket.summ) }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.</p>
        </div>
      </form>
    </section>
  </main>
</template>
