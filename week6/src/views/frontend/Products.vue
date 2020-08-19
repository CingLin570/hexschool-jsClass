<template>
    <div class="pt-5">
        <h2 class="mt-2">這裡是產品頁</h2>
    <table class="table table-striped">
      <thead>
    <tr>
      <th scope="col">產品名</th>
      <th scope="col">產品敘述</th>
      <th scope="col">產品價格</th>
      <th scope="col">產品連結</th>
    </tr>
  </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
        <th scope="row">{{item.title}}</th>
        <td>{{item.content}}</td>
        <td>{{item.price | total}}</td>
        <td>
          <!-- <router-link :to="`/product/${item.id}`">詳細產品資訊</router-link> -->
          <button type="button" class="btn btn-dark" @click.prevent="goPage(item)">產品資訊</button>
        </td>
        </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    goPage (item) {
      this.$router.push(`/product/${item.id}`)
    }
  },
  created () {
    this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`)
      .then((response) => {
        this.products = response.data.data
      })
  }
}
</script>
