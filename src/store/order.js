import config from '@/assets/config'
import axios from 'axios'
import { defineStore } from 'pinia'

export default defineStore('order', {
  state: () => ({
    order: [],
    delivery: [],
    payments: []
  }),
  actions: {
    add(data) {
      axios.post(config.apiUrl + '/orders', data, {
        params: {
          userAccessKey: this.accessKey
        }
      })
    },
    getDelivery() {
      return axios.get(config.apiUrl + '/deliveries').then((rez) => {
        console.log(rez)
        this.delivery = rez.data
      })
    },
    getPayments(delivId) {
      if (!delivId) return
      return axios
        .get(config.apiUrl + '/payments', { params: { deliveryTypeId: delivId } })
        .then((rez) => {
          console.log(rez)
          this.payments = rez.data
        })
    }
  }
})
