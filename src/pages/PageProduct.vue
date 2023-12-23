<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { basketStore } from '@/store/basket'
import axios from 'axios'
import config from '@/assets/config'
import { numberFormat } from '@/helpers'
const router = useRoute()
const basket = basketStore()
const quantity = ref(1)
const productSize = ref(null)
const productColor = ref(null)

let error = ref('')

let product = ref([])

axios.get(config.apiUrl + '/products/' + router.params.id).then((rez) => {
  console.log(rez)
  product.value = rez.data
  productColor.value = product.value.colors[0].color.id
})

const currentImage = computed(() => {
  const color = product.value.colors.find((color) => color.color.id === productColor.value)
  console.log('color', color)
  if (color && color.gallery) return color.gallery[0].file.url
  return false
})
function toBasket() {
  console.log(basket)
  const data = {
    productId: product.value.id,
    colorId: productColor.value,
    sizeId: productSize.value,
    quantity: quantity.value
  }
  error.value = ''
  basket.add(data).catch((error) => {
    console.log(error.response.data)
    error.value = error.response.data
  })
}
</script>
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :class="'breadcrumbs__link'" :to="{ name: 'catalog' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :class="'breadcrumbs__link'" :to="{ name: 'catalog' }">
            {{ product.category ? product.category.title : 'Носки' }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item" v-if="product.title">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="currentImage" :alt="product.title" />
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="color of product.colors" :key="color.id">
            <a
              href=""
              @click.prevent="productColor = color.id"
              class="pics__link pics__link--current"
            >
              <img
                v-if="color.gallery"
                width="98"
                height="98"
                :src="color.gallery[0].file.url"
                :alt="product.title"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="toBasket">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" @click="quantity--" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model="quantity" />

                <button type="button" @click="quantity++" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> {{ numberFormat(product.price) }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color of product.colors" :key="color.id">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        :value="color.color.id"
                        v-model="productColor"
                      />
                      <span class="colors__value" :style="{ 'background-color': color.color.code }">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" v-model="productSize">
                    <option :value="size.id" v-for="size of product.sizes" :key="size.id">
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">В корзину</button>
            <p>{{ error }}</p>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Информация о товаре </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Доставка и возврат </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br />
            30% полиэстер<br />
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
