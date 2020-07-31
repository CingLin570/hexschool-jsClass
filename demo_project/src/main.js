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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
