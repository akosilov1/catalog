import config from '@/assets/config'
import axios from 'axios'
import { defineStore } from 'pinia'

export const basketStore = defineStore('basket', {
  state: () => ({
    basket: [],
    errors: [],
    accessKey: null
  }),
  getters: {
    count() {
      return this.basket.length
    },
    summ() {
      let summ = 0
      this.basket.reduce((summ, item) => (summ += item.price * item.quantity))
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
    },
    get() {
      if (!this.accessKey) {
        this.accessKey = localStorage.getItem('accessKey')
      }
      return axios(config.apiUrl + '/baskets', {
        params: {
          userAccessKey: this.accessKey
        }
      }).then((rez) => {
        this.basket = rez.data.items
      })
    }
  }
})
