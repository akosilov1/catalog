<script setup>
import config from '@/assets/config'
import axios from 'axios'
import { ref } from 'vue'
import { productsStore } from '@/store'

const store = productsStore()
const filterPriceFrom = ref(0)
const filterPriceTo = ref(0)
const filterCategory = ref(null)
const filterMaterial = ref([])
const filterCollection = ref([])

let categories = ref([])
let materials = ref([])
let seasons = ref([])

const promises = [
  axios.get(config.apiUrl + '/productCategories'),
  axios.get(config.apiUrl + '/materials'),
  axios.get(config.apiUrl + '/seasons')
]
Promise.all(promises).then((rez) => {
  categories.value = rez[0].data.items
  materials.value = rez[1].data.items
  seasons.value = rez[2].data.items
})

function submitFilter() {
  const filter = {
    page: 1,
    limit: 12,
    categoryId: filterCategory.value,
    materialIds: filterMaterial.value,
    seasonIds: filterCollection.value,
    minPrice: filterPriceFrom.value,
    maxPrice: filterPriceTo.value
  }
  store.getProducts(filter)
}
</script>

<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submitFilter">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" v-model.number="filterPriceFrom" />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" v-model.number="filterPriceTo" />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" v-model="filterCategory">
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material of materials" :key="material.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                v-model="filterMaterial"
                :value="material.id"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons" :key="season.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                v-model="filterCollection"
                :value="season.id"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button">Сбросить</button>
    </form>
  </aside>
</template>
