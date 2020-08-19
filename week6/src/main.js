import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend
} from 'vee-validate' // 驗證套件
import * as rules from 'vee-validate/dist/rules' // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json' // 語系檔案
import Loading from 'vue-loading-overlay'
import './bus'
import 'vue-loading-overlay/dist/vue-loading.css'
import App from './App.vue'
import router from './router'
// 套件加入 Vue 的藍圖(原型內)

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
}) // 所有驗證規則
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
localize('tw', zhTW)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
// 元件全域註冊
Vue.component('Loading', Loading)

Vue.filter('total', function (num) {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return '$' + parts.join('.')
})
Vue.filter('percent', function (num) {
  return num + '%'
})
// 驗證登入
router.beforeEach((to, from, next) => {
  // ...
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證')
    const url = `${process.env.VUE_APP_APIPATH}/api/auth/check`
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    axios.post(url, {
      api_token: token
    }).then((response) => {
      if (response.data.success) {
        next()
      } else {
        console.log('未取得token')
        next({
          path: '/Login'
        })
      }
    }).catch((error) => {
      console.log(error.response.data.message)
      next({
        path: '/Login'
      })
    })
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
