// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Toasted from 'vue-toasted'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

window.Vue = Vue
Vue.prototype.$http = axios

Vue.use(Toasted, {
  fullWidth: true,
  fitToScreen: true,
  closeOnSwipe: true,
  duration: 2000,
  // you can pass a single action as below
  action: {
    text: 'X',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})

const baseURL = `http://localhost:8080/crud/`
axios.defaults.baseURL = baseURL

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    this.validateUser()
  },
  methods: {
    validateUser () {
      if (localStorage.getItem('currentUser')) {
        this.$http.post('admin/validate',
          {
            headers: {
              'authorization': 'Bearer ' + localStorage.getItem('currentUser')
            }
          })
          .then(response => {
            if (!response.data.success) {
              localStorage.removeItem('currentUser')
            }
          })
          .catch(error => {
            console.log('error', error)
            localStorage.removeItem('currentUser')
          })
      }
    }
  }
})
