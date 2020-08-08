<template>
  <div class="pt-2">
    <div class="text-right">
      <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">建立新產品</button>
    </div>
        <h2>這裡是後台產品頁</h2>
    <table class="table table-striped">
      <thead>
    <tr>
      <th scope="col">產品分類</th>
      <th scope="col">產品名稱</th>
      <th scope="col">產品原價</th>
      <th scope="col">產品售價</th>
      <th scope="col">產品連結</th>
    </tr>
  </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
        <th scope="row">{{item.category}}</th>
        <td>{{item.title}}</td>
        <td>{{item.origin_price}}</td>
        <td>{{item.price}}</td>
        <td>
          <!-- <router-link :to="`/product/${item.id}`">詳細產品資訊</router-link> -->
        </td>
        </tr>
        </tbody>
    </table>
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      products: {}
    }
  },
  props: ['tokens'],
  created () {
    const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products`
    this.$http.get(url)
      .then((response) => {
        this.products = response.data.data
      })
  }
}
</script>
