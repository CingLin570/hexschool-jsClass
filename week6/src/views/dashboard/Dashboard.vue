<template>
  <div>
    <h2>後台管理</h2>
    <router-link to="products">後台產品列表</router-link> |
    <router-link to="coupons">優惠卷</router-link>
    <router-view :tokens="token" v-if="isTokenSuccess"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      isTokenSuccess: false
    }
  },
  created () {
    this.isSuccess()
  },
  methods: {
    isSuccess () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const url = `${process.env.VUE_APP_APIPATH}/api/auth/check`
      this.$http.post(url, {
        api_token: this.token
      })
        .then((response) => {
          this.isTokenSuccess = true
          console.log(response)
        }).catch((err) => {
          console.log(err.response)
          this.$router.push('/Login')
        })
    }
  }
}
</script>
