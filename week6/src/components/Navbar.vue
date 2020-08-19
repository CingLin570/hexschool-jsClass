<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <loading :active.sync="isLoading"></loading>
  <a class="navbar-brand font-style m-0 px-4" href="#" @click.prevent="goHome">S protein</a>
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      isLoading: false
    }
  },
  methods: {
    signOut () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/auth/logout`
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.$http.post(url, {
        api_token: this.token
      }).then((response) => {
        this.isLoading = false
        this.$bus.$emit('message:push',
          '登出成功',
          'success')
        this.$router.push('/Login')
      }).catch((error) => {
        console.log(error.response)
      })
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .font-style{
    font-family: 'Lemon', cursive;
  }
</style>
