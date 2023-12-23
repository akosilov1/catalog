<script setup>
import { productsStore } from '@/store'
import CatalogItem from '@/components/CatalogItem.vue'
import CatalogFilter from '@/components/CatalogFilter.vue'
import PagePagination from '@/components/PagePagination.vue'
import { computed } from 'vue'

const store = productsStore()

store.getProducts({ limit: 12, page: 1 })

const items = computed(() => {
  return store.products
})

const pageCount = computed(() => {
  return store.page.pages
})
const currentPage = computed(() => {
  return store.page.page
})
function getPage(params) {
  store.getProducts({ limit: 12, page: params.page })
}
</script>
<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ items.length }} товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <CatalogFilter />
      <section class="catalog">
        <div v-if="store.preloader">Загружаем товары ...</div>
        <ul v-else class="catalog__list">
          <CatalogItem v-for="item in items" :key="item.id" :item="item" />
        </ul>
        <PagePagination :page-count="pageCount" :current-page="currentPage" @get-page="getPage" />
      </section>
    </div>
  </main>
</template>
