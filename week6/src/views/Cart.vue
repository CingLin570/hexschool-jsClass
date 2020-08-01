<template>
  <div class="pt-5">
    <h2 class="mt-2">這裡是購物車</h2>
      <div class="card">
        <div class="card-body">
          <table class="table">
  <thead>
    <tr>
      <th scope="col">刪除</th>
      <th scope="col">產品圖片</th>
      <th scope="col">產品名稱</th>
      <th scope="col">產品數量</th>
      <th scope="col">單位</th>
      <th scope="col">價格</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in cart" :key="item.product.id">
      <th scope="row"><button type="button" class="btn btn-outline-danger btn-sm">刪除</button></th>
      <td><img :src="item.product.imageUrl" alt="" class="img-fluid" width="100px"></td>
      <td>{{item.product.title}}</td>
      <td>
        <button type="button" class="btn btn-outline-dark btn-sm mr-2"><i class="fas fa-minus"></i></button>
        {{item.quantity}}
        <button type="button" class="btn btn-outline-dark btn-sm ml-2"><i class="fas fa-plus"></i></button>
      </td>
      <td>{{item.product.unit}}</td>
      <td>{{item.product.price | total}}</td>
    </tr>
  </tbody>
</table>
      </div>
</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cart: []
    }
  },
  created () {
    this.getCart()
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url).then((response) => {
        console.log(response.data.data)
        this.cart = response.data.data
      })
    }
  }
}
</script>
