import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/frontend/layout/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: '首頁',
    component: Home,
    children: [
      {
        path: '',
        name: '前台選單列表',
        component: () => import('../views/Banner.vue')
      },
      {
        path: '/about',
        name: '關於我們頁面',
        component: () => import('../views/frontend/About.vue')
      },
      {
        path: '/products',
        name: '前台產品列表',
        component: () => import('../views/frontend/Products.vue')
      },
      { // 動態路由
        path: '/product/:id',
        name: '前台單一產品',
        component: () => import('../views/frontend/Product.vue')
      },
      {
        path: '/cart',
        name: '前台購物車',
        component: () => import('../views/frontend/Cart.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '後台登入頁面',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: '後台首頁',
    component: () => import('../views/backend/layout/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '後台產品頁面',
        component: () => import('../views/backend/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: '後台優惠卷',
        component: () => import('../views/backend/Coupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'storages',
        name: '圖片儲存庫頁面',
        component: () => import('../views/backend/Storages.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'detail',
        name: '客戶訂單明細頁面',
        component: () => import('../views/backend/Order.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: '模擬訂單頁面',
        component: () => import('../views/backend/CustomerOrders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'customer_checkout/:orderId',
        name: '用戶訂單列表',
        component: () => import('../views/backend/CustomerCheckout.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
