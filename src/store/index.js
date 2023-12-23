import { defineStore } from 'pinia'
import axios from 'axios'
import config from '@/assets/config'
export const productsStore = defineStore('catalog', {
  state: () => ({
    products: [],
    page: [],
    preloader: false
  }),
  actions: {
    getProducts(params) {
      this.preloader = true
      this.products = []
      axios.get(config.apiUrl + '/products/', { params }).then((rez) => {
        console.log(rez)
        rez.data.items.map((item) => {
          this.products.push(item)
        })
        this.page = rez.data.pagination
        this.preloader = false
      })
    }
  }
})
