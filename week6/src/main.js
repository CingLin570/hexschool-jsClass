import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import App from './App.vue'
import router from './router'
// 套件加入 Vue 的藍圖(原型內)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
// 元件全域註冊
Vue.component('Loading', Loading)

Vue.filter('total', function (num) {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return '$' + parts.join('.')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
