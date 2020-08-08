<template>
  <div class="home">
    <div class="p-0">
      <loading :active.sync="isLoading"></loading>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed w-100">
  <a class="navbar-brand font-style" href="">S protein</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
    <router-link to="/" class="nav-link h5">首頁</router-link>
    <router-link to="/about" class="nav-link h5">關於我們</router-link>
    <router-link to='/products' class="nav-link h5">產品列表</router-link>
    <router-link to='/cart' class="nav-link h5">購物車</router-link>
    <router-link to='/Login' class="nav-link h5">後台產品頁面</router-link>
    </div>
  </div>
</nav>
    </div>
      <router-view/>
  </div>
</template>

<script type="module">
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    this.isLoading = true
    this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`)
      .then((response) => {
        this.isLoading = false
      })
  }
}
</script>

<style>
  .font-style{
    font-family: 'Lemon', cursive;
  }
</style>
