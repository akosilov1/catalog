import config from '@/assets/config'
import axios from 'axios'
import { defineStore } from 'pinia'

export const basketStore = defineStore('basket', {
  state: () => ({
    basket: [],
    errors: '',
    accessKey: null
  }),
  getters: {
    count() {
      return this.basket.length
    },
    summ() {
      const summ = this.basket.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
      return summ
    }
  },
  actions: {
    add(data) {
      return axios
        .post(config.apiUrl + '/baskets/products', data, {
          params: {
            userAccessKey: this.accessKey
          },
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then((rez) => {
          console.log(rez.data)
          if (rez.data.items) {
            this.basket = rez.data.items
          }
          if (rez.data.error) {
            this.errors = rez.data.error
          }
        })
        .catch((error) => (this.errors = error))
    },
    get() {
      if (!this.accessKey) {
        this.accessKey = localStorage.getItem('accessKey')
      }
      return axios(config.apiUrl + '/baskets', {
        params: {
          userAccessKey: this.accessKey
        }
      })
        .then((rez) => {
          this.basket = rez.data.items
        })
        .catch((error) => (this.errors = error))
    },
    update(productId, quantity) {
      return axios({
        url: config.apiUrl + '/baskets/products',
        method: 'put',
        params: { userAccessKey: this.accessKey },
        data: { basketItemId: productId, quantity }
      })
        .then((rez) => {
          if (rez.data.items) {
            this.basket = rez.data.items
          }
        })

        .catch((err) => {
          console.log(err)
          this.errors = err
        })
    },
    delete(productId) {
      return axios({
        url: config.apiUrl + '/baskets/products',
        method: 'delete',
        params: { userAccessKey: this.accessKey },
        data: { basketItemId: productId }
      })
        .then((rez) => {
          if (rez.data.items) {
            this.basket = rez.data.items
          }
        })
        .catch((error) => (this.errors = error))
    }
  }
})
