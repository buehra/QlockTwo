import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

fetch(process.env.BASE_URL + "configuration.ch.json")
  .then((response) => {
    response.json().then((config) => {
       Vue.prototype.$config = config
       new Vue({
         render: (h) => h(App)
       }).$mount("#app")
    })
})