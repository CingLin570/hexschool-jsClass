<template>
  <div>
    <!-- <h2>後台管理</h2>
    <router-link to="products">後台產品列表</router-link> |
    <router-link to="coupons">優惠卷</router-link>
    <router-view :tokens="token" v-if="isTokenSuccess"></router-view> -->
    <Navbar/>
<div class="container-fluid">
  <div class="row">
    <Sidebar/>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <router-view></router-view>
    </main>
  </div>
</div>
  </div>
</template>

<script>
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar'
export default {
  components: {
    Sidebar,
    Navbar
  },
  data () {
    return {
    }
  }
}
</script>
