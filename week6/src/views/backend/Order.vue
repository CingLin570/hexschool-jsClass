<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h2>客戶訂單資訊</h2>
    <table class="table table-striped">
  <thead>
    <tr>
      <th>下單時間</th>
      <th>購買款項</th>
      <th>付款方式</th>
      <th>應付金額</th>
      <th>是否付款</th>
      <th>取得產品細節</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in order" :key="item.id" :class="{'text-secondary': !item.paid}">
      <th scope="row">{{ item.updated.datetime }}</th>
      <td>
      <ul class="list-unstyled">
        <li v-for="(product, i) in item.products" :key="i">
          {{ product.product.title }} 數量：{{ product.quantity }}
          {{ product.product.unit }}
        </li>
      </ul>
      </td>
      <td>{{ item.payment }}</td>
      <td>{{ item.amount | total }}</td>
      <td>
        <div class="custom-control custom-switch">
          <input
          :id="item.id"
          v-model="item.paid"
          type="checkbox"
          class="custom-control-input"
          @change="setOrderPaid(item)"
          >
              <label
                class="custom-control-label"
                :for="item.id"
              >
                <strong
                  v-if="item.paid"
                  class="text-success"
                >已付款</strong>
                <span
                  v-else
                  class="text-muted"
                >尚未付款</span>
              </label>
            </div>
        </td>
        <td>
        <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModal" @click="getuserDetail(item)">顧客明細</button>
        </td>
    </tr>
  </tbody>
</table>
  <Pagination :pages="pagination" @emitPages="getOrder"/>
  <!-- Modal -->
<div class="modal fade" id="userDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">顧客明細表</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">電子郵件</th>
      <th scope="col">電話</th>
      <th scope="col">地址</th>
      <th scope="col">使用付款方式</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{{ userDetail.user.name }}</th>
      <td>{{ userDetail.user.email }}</td>
      <td>{{ userDetail.user.tel }}</td>
      <td>{{ userDetail.user.address }}</td>
      <td>{{ userDetail.payment }}</td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import $ from 'jquery'

export default {
  name: 'order',
  components: {
    Pagination
  },
  data () {
    return {
      pagination: {},
      order: {},
      isLoading: false,
      userDetail: {
        user: {}
      }
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    getOrder (page = 1, pages = 10) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders`
      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.order = response.data.data
        this.pagination = response.data.meta.pagination
      })
    },
    setOrderPaid (item) {
      this.isLoading = true
      // 已付款
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`
      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`
      }
      this.$http.patch(url, item.id).then(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '付款資訊修改完成', 'success')
        this.getOrder()
      })
    },
    getuserDetail (item) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}`
      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.userDetail = response.data.data
        $('#userDetail').modal('show')
      })
    }
  }
}
</script>
