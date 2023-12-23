<script setup>
const props = defineProps(['pageCount', 'currentPage'])
const emits = defineEmits(['getPage'])
function getPage(page) {
  if (page < 1 || page > props.pageCount) return null
  emits('getPage', { page: page })
}
</script>
<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        :class="{
          pagination__link: true,
          'pagination__link--arrow': true,
          'pagination__link--disabled': props.currentPage === 1
        }"
        aria-label="Предыдущая страница"
        @click.prevent="getPage(props.currentPage - 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="page of props.pageCount" :key="page">
      <a
        href="#"
        @click.prevent="getPage(page)"
        :class="{
          pagination__link: true,
          'pagination__link--current': page === props.currentPage
        }"
      >
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        :class="{
          pagination__link: true,
          'pagination__link--arrow': true,
          'pagination__link--disabled': props.currentPage === props.pageCount
        }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="getPage(props.currentPage + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
