<template>
  <div class="pt-5">
    <loading :active.sync="isLoading"></loading>
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
      <th scope="row"><button type="button" class="btn btn-outline-danger btn-sm" @click.prevent=" removeCartItem(item.product.id)">刪除</button></th>
      <td><img :src="item.product.imageUrl" alt="" class="img-fluid" width="100px"></td>
      <td>{{item.product.title}}</td>
      <td>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-outline-dark btn-sm rounded-0"  @click="quantityUpdata(item.product.id, item.quantity - 1)" :disabled="item.quantity === 1"><i class="fas fa-minus"></i></button>
        <span class="d-flex align-items-center px-2 border-top border-bottom border-primary border-dark">{{item.quantity}}</span>
        <button type="button" class="btn btn-outline-dark btn-sm rounded-0" @click="quantityUpdata(item.product.id, item.quantity + 1)"><i class="fas fa-plus"></i></button>
        </div>
      </td>
      <td>{{item.product.unit}}</td>
      <td>{{item.product.price | total}}</td>
    </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>總計</td>
    <td class="text-center">
      {{ cartTotal | total }}
    </td>
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
      cart: [],
      cartTotal: 0,
      cartQuantity: 0,
      isLoading: false
    }
  },
  created () {
    this.getCart()
  },
  methods: {
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        this.cart.forEach((item) => {
          this.cartTotal += (item.product.price * item.quantity)
          this.cartQuantity += item.quantity
        })
        this.isLoading = false
      })
    },
    quantityUpdata (id, num) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      const data = {
        product: id,
        quantity: num
      }
      this.$http.patch(url, data).then((response) => {
        this.cartTotal = 0
        this.cartQuantity = 0
        this.getCart()
      })
    },
    removeCartItem (id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.isLoading = true
      this.$http.delete(url).then(() => {
        this.cartTotal = 0
        this.cartQuantity = 0
        this.getCart()
      }).catch((err) => {
        console.log(err.data)
      })
    }
  }
}
</script>
