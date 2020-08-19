<template>
<div class="container">
  <loading :active.sync="isLoading"></loading>
  <h2>模擬下單</h2>
  <!-- 產品列表 start -->
  <div class="row mt-4 justify-content-center">
      <div v-for="item in products" :key="item.id" class="col-3 mb-4">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center center;"
            :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
          <!-- 由於 content 是使用 vue2Editor 生成 HTML 標籤
            所以必須使用 v-html 渲染，因此這邊會出現提示警告是正常的
            如果要解決 ESLint 錯誤，只需要使用該方式就可以
            -->
            <!-- eslint-disable -->
            <p
              class="card-text"
              v-html="item.content"
            >
              {{ item.content }}
            </p>
            <!--eslint-enable-->
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 售價(price)欄位是可選的，因此售價若為空，就顯示原價(origin_price)
    售價若不為空，就顯示原價(origin_price)與售價(price) -->
              <div v-if="!item.price" class="h5">
                {{ item.origin_price | total }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ item.origin_price | total }} 元</del>
                <div class="h5">
                  現在只要 <span class="text-danger">{{ item.price | total }}</span> 元
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="getDetailed(item.id)">
              <i
                v-if="status.loadingItem === item.id"
                class="spinner-grow spinner-grow-sm"
              />
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
            @click="addCart(item)">
              <!-- <i v-if="status.loadingItem === item.id" class="spinner-grow spinner-grow-sm"></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
  </div>
  <!-- 查看更多 -->
      <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              {{ tempProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="tempProduct.imageUrl[0]"
              class="img-fluid"
              alt
            >
            <blockquote class="blockquote mt-3">
              <!-- 由於 content 是使用 vue2Editor 生成 HTML 標籤
              所以必須使用 v-html 渲染，因此這邊會出現提示警告是正常的 -->
              <!-- eslint-disable -->
              <p
                class="mb-0"
                v-html="tempProduct.content"
              />
              <!--eslint-enable-->
              <footer class="blockquote-footer text-right">
                {{ tempProduct.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                v-if="!tempProduct.price"
                class="h4"
              >
                {{ tempProduct.origin_price }} 元
              </div>
              <div v-else>
                <del
                  class="h6"
                >原價 {{ tempProduct.origin_price }} 元</del>
                <div
                  class="h4"
                >
                  現在只要 {{ tempProduct.price }} 元
                </div>
              </div>
            </div>
            <select
              v-model="tempProduct.num"
              name
              class="form-control mt-3"
            >
              <option
                value="0"
                disabled
                selected
              >
                請選擇數量
              </option>
              <option
                v-for="num in 10"
                :key="num"
                :value="num"
              >
                選購 {{ num }} {{ tempProduct.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div
              v-if="tempProduct.num"
              class="text-muted text-nowrap mr-3"
            >
              小計
              <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(tempProduct, tempProduct.num)"
            >
              <i
                v-if="tempProduct.id === status.loadingItem"
                class="fas fa-spinner fa-spin"
              />
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  <div class="row my-4">
    <div class="col-5">
      <div class="input-group mb-3 input-group-sm">
        <input
          type="text"
          class="form-control"
          placeholder="請輸入優惠碼"
          v-model="couponCode"
        >
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="addCoupon"
        >
              套用優惠碼
            </button>
          </div>
        </div>
      <validation-observer v-slot="{ invalid }">
        <form class="text-left" @submit.prevent="createOrder">
      <div class="form-group">
        <validation-provider v-slot="{ errors, classes }" rules="required">
          <label for="username">收件人姓名</label>
          <input id="username" v-model="form.name" type="text" class="form-control" :class="classes">
          <span v-if="errors[0]" class="text-danger">{{ `收件人姓名${errors[0].slice(9, errors[0].length)}` }}</span>
      </validation-provider>
      </div>
      <div class="form-group">
        <validation-provider v-slot="{ errors, classes }" rules="required|email">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" class="form-control" :class="classes">
          <span v-if="errors[0]" class="text-danger">{{ `信箱${errors[0].slice(6,errors[0].length)}` }}</span>
        </validation-provider>
      </div>
      <div class="form-group">
        <validation-provider v-slot="{ errors, classes }" rules="required|min:8|numeric">
          <label for="tel">電話</label>
          <input id="tel" v-model="form.tel" type="tel" class="form-control" :class="classes">
          <span v-if="errors[0]" class="text-danger">{{ `電話${errors[0].slice(4, errors[0].length)}`}}</span>
        </validation-provider>
      </div>
      <div class="form-group">
      <validation-provider v-slot="{ errors, classes }" rules="required">
      <label for="address">地址</label>
      <input id="address" v-model="form.address" type="text" class="form-control" :class="classes">
      <span v-if="errors[0]" class="text-danger">{{ `地址${errors[0].slice(8, errors[0].length)}` }}</span>
      </validation-provider>
      </div>
      <div class="form-group">
      <label for="message">購買方式</label>
      <select v-model="form.payment" class="form-control" required>
      <option value="" disabled>
      請選擇付款方式
      </option>
      <option value="WebATM">
      WebATM
      </option>
      <option value="ATM">
      ATM
      </option>
      <option value="CVS">
      CVS
      </option>
      <option value="Barcode">
      Barcode
      </option>
      <option value="Credit">
      Credit
      </option>
      <option value="ApplePay">
      ApplePay
      </option>
      <option value="GooglePay">
      GooglePay
      </option>
      </select>
      </div>
      <div class="form-group">
      <label for="message">留言</label>
      <textarea id="message" class="form-control" v-model="form.message" cols="30" rows="3" style="resize : none;">
      </textarea>
      </div>
      <button type="submit" class="btn btn-outline-dark" :disabled="invalid">送出表單</button>
      </form>
      </validation-observer>
    </div>
        <div class="col-7">
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAllCartItem()">
                <i class="far fa-trash-alt"> 刪除所有品項</i>
              </button>
              <table class="table">
                <thead>
                  <th width="30px">刪除</th>
                  <th>品名</th>
                  <th width="110px">
                    數量
                  </th>
                  <th class="text-right">單位</th>
                  <th class="text-right">單價</th>
                </thead>
                <tbody v-if="cart.length" class="text-right">
                  <tr v-for="item in cart" :key="item.id">
                    <td class="align-middle">
                      <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="removeCartItem(item.product.id)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      {{ item.product.title }}
                    </td>
                    <td class="align-middle">
                      <div class="d-flex">
                        <button class="btn btn-sm btn-outline-primary mr-2" type="button"
                          @click="quantityUpdata(item.product.id, item.quantity - 1)" :disabled="item.quantity === 1">
                          -
                        </button>
                        <!-- <input id="inlineFormInputGroupUsername" type="number" min=1 class="form-control text-center"
                          :value="item.quantity" @change.prevent="quantityUpdata(item.product.id, $event.target.value)"> -->
                        <span class="m-2"> {{item.quantity}}</span>
                        <button class="btn btn-sm btn-outline-primary ml-2" type="button"
                          @click="quantityUpdata(item.product.id, item.quantity + 1)">
                          +
                        </button>
                      </div>
                    </td>
                    <td class="align-middle">
                      {{ item.product.unit }}
                    </td>
                    <td class="align-middle text-right">
                      {{ item.product.price | total}}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="text-right">
                      總計
                    </td>
                    <td class="text-right">
                      {{ cartTotal | total }}
                    </td>
                  </tr>
                  <tr v-if="coupon.enabled" class="text-success">
                    <td colspan="4" class="text-right">
                      折扣價
                    </td>
                    <td class="text-right" >
                      {{ parseInt(cartTotal * (coupon.percent / 100)) | total }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
  </div>
  <Pagination :pages="pagination" @emitPages="getProduct"/>
</div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'order',
  components: {
    Pagination
  },
  data () {
    return {
      status: {
        loadingItem: ''
      },
      tempProduct: {
        num: 0,
        imageUrl: []
      },
      products: {},
      pagination: {},
      isLoading: false,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      },
      cart: {},
      cartTotal: 0,
      cartQuantity: 0,
      coupon: {},
      couponCode: ''
    }
  },
  created () {
    this.getProduct()
    this.getCart()
  },
  methods: {
    // 取得產品
    getProduct (page = 1, paged = 20) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}&paged=${paged}`
      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.products = response.data.data
        this.pagination = response.data.meta.pagination
      })
    },
    // 取得購物車
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
    // 加入購物車
    addCart (item, quantity = 1) {
      this.isLoading = true
      // api必要欄位
      const cart = {
        product: item.id,
        quantity
      }
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.post(url, cart).then((response) => {
        this.isLoading = false
        this.cartTotal = 0
        this.cartQuantity = 0
        this.getCart()
      }).catch(() => {
        this.isLoading = false
        alert('商品已加入購物車')
      })
    },
    // 數量加減按鈕
    quantityUpdata (id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return

      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      // 必要欄位
      const data = {
        product: id,
        quantity: num
      }
      this.$http.patch(url, data).then((response) => {
        this.cartTotal = 0
        this.cartQuantity = 0
        this.isLoading = false
        this.getCart()
      })
    },
    // 使用api刪除購物車全部資料
    removeAllCartItem () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.$http.delete(url).then((response) => {
        this.cartTotal = 0
        this.cartQuantity = 0
        this.isLoading = false
        this.getCart()
      })
    },
    // 刪除單一購物車產品
    removeCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.$http.delete(url).then((response) => {
        this.cartTotal = 0
        this.cartQuantity = 0
        this.isLoading = false
        this.getCart()
      })
    },
    // 建立訂單
    createOrder () {
      this.isLoading = true
      const order = { ...this.form }
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`
      // 如果有優惠卷就加入，請注意該 coupon 必須先執行過 this.addCoupon()
      // 主要會使用 enabled 屬性判斷該 coupon 是否可以使用
      // 如果沒有執行 this.addCoupon() 那麼 enabled 就會是 undefined，因此還是不會執行
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code
      }
      this.$http.post(url, order).then((response) => {
        if (response.data.data.id) {
          this.isLoading = true
          this.$bus.$emit('message:push', '訂單建立成功囉~',
            'success')
          this.$router.push(`/admin/customer_checkout/${response.data.data.id}`)
        }
      }).catch((error) => {
        const errorData = error.response.data.errors
        errorData.forEach((err) => {
          this.$bus.$emit('message:push',
            `建立訂單失敗惹，好糗Σ( ° △ °|||)︴
          ${err}`,
            'danger')
        })
        this.isLoading = false
      })
    },
    addCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`
      this.$http.post(url, { code: this.couponCode }).then((response) => {
        // 若 coupon 存在就回寫回去到 this.coupon
        // 該資料會是一個物件格式，詳情可見 API 文件
        // https://course-ec-api.hexschool.io/document#frontend-search-coupon-code-code
        console.log(response.data.data)
        this.coupon = response.data.data
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        const errorData = error.response.data.errors
        console.log(error.response)
        if (errorData) {
          errorData.code.forEach((err) => {
            this.$bus.$emit('message:push',
            `優惠碼錯誤 ${err}`, 'danger')
          })
        } else {
          this.isLoading = false
          const { message } = error.response.data
          this.$bus.$emit('message:push',
            `優惠碼錯誤 ${message}`, 'danger')
        }
      })
    },
    getDetailed (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.$http.get(url).then((response) => {
        this.tempProduct = response.data.data
        // 由於 tempProduct 的 num 沒有預設數字
        // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題
        // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set
        this.$set(this.tempProduct, 'num', 0)
        $('#productModal').modal('show')
        this.isLoading = false
      })
    }
  }
}
</script>
