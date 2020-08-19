<template>
    <div class="my-5 row no-gutters justify-content-center">
    <Loading :active.sync="isLoading" />

    <div class="col-md-10">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>購買方式</th>
            <th>商品列表</th>
            <th>應付金額</th>
            <th>付款狀態</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody v-if="orders.length">
          <tr
            v-for="(item, key) in orders"
            :key="key"
            :class="{'text-secondary': !item.is_paid}"
          >
            <td>{{ item.created.datetime }}</td>
            <td>
              {{ item.payment }}
            </td>
            <td>
              <ul class="list-unstyled">
                <li
                  v-for="(product, i) in item.products"
                  :key="i"
                >
                  {{ product.product.title }} 數量：{{ product.quantity }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">
              {{ item.amount }}
            </td>
            <td>
              <strong
                v-if="item.paid"
                class="text-success"
              >
                已付款
              </strong>
              <span
                v-else
                class="text-muted"
              >
                未付款
              </span>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  class="btn btn-outline-primary"
                  :disabled="item.paid"
                  @click.prevent="getDetailed(item.id)"
                >
                  選擇
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @emitPages="getOrders"/>
    </div>
    <hr class="w-100">

    <form
      class="col-md-6"
      @submit.prevent="payOrder"
    >
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr
            v-for="(item, key) in order.products"
            :key="key"
          >
            <td class="align-middle">
              {{ item.product.title }}
            </td>
            <td class="align-middle">
              {{ item.quantity }}/{{ item.product.unit }}
            </td>
            <td class="align-middle text-right">
              {{ item.product.price | total }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td
              colspan="2"
              class="text-right"
            >
              總計
            </td>
            <td class="text-right" v-if="order.amount">
              {{ parseInt(order.amount)  | total }}
            </td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">
              Email
            </th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.paid">尚未付款</span>
              <span
                v-else
                class="text-success"
              >付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="order.paid === false"
        class="text-right"
      >
        <button class="btn btn-danger">
          確認付款去
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'customerCheckout',
  components: {
    Pagination
  },
  data () {
    return {
      order: {
        user: {}
      },
      orders: [],
      orderId: '',
      isLoading: false,
      pagination: {}
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    if (this.orderId) {
      this.getDetailed(this.orderId)
    }

    this.getOrders()
  },
  methods: {
    getOrders (page = 1, paged = 5) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders?page=${page}&paged=${paged}`
      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.pagination = response.data.meta.pagination
        this.orders = response.data.data
      })
    },
    getDetailed (id) {
      this.isLoading = true
      this.orderId = id
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${id}`
      this.$http.get(url).then((response) => {
        this.order = response.data.data
        this.isLoading = false
      })
    },
    payOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}/paying`
      this.$http.post(url).then((response) => {
        if (response.data.data.paid) {
          this.getDetailed(this.orderId)
        }
        this.isLoading = false
      })
    }
  }
}
</script>
