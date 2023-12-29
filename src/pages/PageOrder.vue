<script setup>
import { basketStore } from '@/store/basket'
import orderStore from '@/store/order'
import { numberFormat } from '@/helpers'

import OrderPayment from '@/components/OrderPayment.vue'
import OrderDelivery from '@/components/OrderDelivery.vue'
import FormInput from '@/components/FormInput.vue'

const order = orderStore()
const basket = basketStore()

order.getDelivery()

function addOrder() {
  order.add()
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
      <form class="cart__form form" action="#" method="POST" @submit.prevent="addOrder">
        <div class="cart__field">
          <div class="cart__data">
            <form-input type="text" name="name" placeholder="Введите ваше полное имя" title="ФИО" />
            <form-input
              type="text"
              name="address"
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
            />
            <form-input type="tel" name="phone" placeholder="Введите ваш телефон" title="Телефон" />
            <form-input type="email" name="email" placeholder="Введи ваш Email" title="Email" />
            <form-input
              type="textarea"
              name="comment"
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
            />
          </div>

          <div class="cart__options">
            <order-delivery />
            <order-payment />
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
