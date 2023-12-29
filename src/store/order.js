import config from '@/assets/config'
import axios from 'axios'
import { defineStore } from 'pinia'

export default defineStore('order', {
  state: () => ({
    order: [],
    delivery: [],
    payments: [],
    orderError: {},

    orderPayment: null,
    orderDelivery: null,
    orderData: {}
  }),
  actions: {
    add() {
      const data = {
        name: this.orderData.name,
        address: this.orderData.address,
        phone: this.orderData.phone,
        email: this.orderData.email,
        comment: this.orderData.comment,
        deliveryTypeId: this.orderDelivery,
        paymentTypeId: this.orderPayment
      }
      axios
        .post(config.apiUrl + '/orders', data, {
          params: {
            userAccessKey: this.accessKey
          }
        })
        .then((rez) => {
          console.log(rez)
        })
        .catch((error) => {
          console.log(error)
          const rez = JSON.parse(error.request.response)
          this.orderError = rez.error.request
        })
    },
    getDelivery() {
      return axios
        .get(config.apiUrl + '/deliveries')
        .then((rez) => {
          console.log(rez)
          this.delivery = rez.data
        })
        .then(() => {
          this.orderDelivery = this.delivery[0].id
          this.getPayments(this.delivery[0].id)
        })
    },
    getPayments(delivId) {
      return axios
        .get(config.apiUrl + '/payments', { params: { deliveryTypeId: delivId } })
        .then((rez) => {
          console.log(rez)
          this.payments = rez.data
        })
        .then(() => {
          this.orderPayment = this.payments[0].id
        })
    }
  }
})
