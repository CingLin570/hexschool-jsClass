<template>
  <div>
    <h2>單一產品頁面</h2>
    <h3>{{product.title}}</h3>
    <img :src="product.imageUrl" alt="" class="img-fluid">
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    const id = this.$route.params.id
    this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`)
      .then((response) => {
        this.product = response.data.data
      })
  }
}
</script>
