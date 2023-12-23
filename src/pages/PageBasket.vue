<script setup>
import { basketStore } from '@/store/basket'
import BasketProduct from '@/components/BasketProduct.vue'
const basket = basketStore()
</script>
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink :class="'breadcrumbs__link'" :to="{ name: 'catalog' }"> Каталог </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink :class="'breadcrumbs__link'" :to="{ name: 'basket' }"> Корзина </RouterLink>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ basket.count }} товара </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <BasketProduct :item="item" v-for="item in basket.basket" :key="item.id" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">Итого: <span>4 070 ₽</span></p>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
      </form>
    </section>
  </main>
</template>
