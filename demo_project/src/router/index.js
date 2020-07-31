import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/products',
    component: () => import('../views/Products.vue')
  },
  { // 動態路由
    path: '/product/:id',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'product',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
