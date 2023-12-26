import { createRouter, createWebHashHistory } from 'vue-router'

import PageProduct from '@/pages/PageProduct.vue'
import PageCatalog from '@/pages/PageCatalog.vue'
import PageBasket from '@/pages/PageBasket.vue'
import PageOrder from '@/pages/PageOrder.vue'
const routes = [
  { name: 'catalog', path: '/', component: PageCatalog },
  {
    name: 'product',
    path: '/product/:id',
    component: PageProduct,
    props: true
  },
  {
    name: 'basket',
    path: '/basket',
    component: PageBasket
  },
  {
    name: 'order',
    path: '/order',
    component: PageOrder
  }
]
export default createRouter({
  history: createWebHashHistory(),
  routes
})
