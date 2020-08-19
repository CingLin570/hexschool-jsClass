<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h2>優惠卷頁面</h2>
    <div class="text-right">
      <button type="button" class="btn btn-dark" @click="openModel('create')">建立新優惠卷</button>
    </div>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">優惠卷名稱</th>
      <th scope="col">優惠卷截止日</th>
      <th scope="col">折扣</th>
      <th scope="col">折扣碼</th>
      <th scope="col">編輯與刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in coupons" :key="item.id">
      <th scope="row">{{ item.title }}</th>
      <td>{{ item.deadline.datetime }}</td>
      <td>{{ item.percent | percent}}</td>
      <td>{{ item.code }}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-primary btn-sm" @click="openModel('edit',item)">編輯</button>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="openModel('delete',item)">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
    <Pagination :pages="pagination" @emitPages="getCoupons"/>
    <!-- Modal -->
<div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">新增優惠卷</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-left">
        <div class="form-group">
          <label for="title">優惠卷名稱</label>
          <input type="text" class="form-control" id="title"
          aria-describedby="emailHelp" placeholder="請輸入標題" v-model="tempCoupon.title">
        </div>
        <div class="form-group">
          <label for="code">折扣碼</label>
          <input type="text" class="form-control" id="code"
          aria-describedby="emailHelp" placeholder="請輸入折扣碼" v-model="tempCoupon.code">
        </div>
        <div class="form-group">
          <label for="percent">折價數值</label>
          <input type="text" class="form-control" id="percent"
          aria-describedby="emailHelp" placeholder="請輸入折扣數值" v-model="tempCoupon.percent">
        </div>
        <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                id="due_date"
                type="date"
                class="form-control"
                v-model="due_date"
              >
            </div>
            <div class="form-group">
              <label for="due_time">到期時間</label>
              <input
                id="due_time"
                type="time"
                step="1"
                class="form-control"
                v-model="due_time"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  id="enabled"
                  class="form-check-input"
                  type="checkbox"
                  v-model="tempCoupon.enabled"
                  :true-value="1"
                  :false-value="0"
                >
                <label
                  class="form-check-label"
                  for="enabled"
                >是否啟用</label>
              </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
      </div>
    </div>
  </div>
</div>
    <!-- 刪除Modal -->
<div class="modal fade" id="delcouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="delCoupon"
            >
              確認刪除
            </button>
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
  name: 'Coupons',
  components: {
    Pagination
  },
  data () {
    return {
      coupons: {},
      pagination: {},
      isLoading: false,
      tempCoupon: {
        title: '',
        code: '',
        percent: 0,
        enabled: false,
        deadline_at: 0
      },
      due_date: '',
      due_time: '',
      status: false
    }
  },
  created () {
    this.getCoupons()
  },
  methods: {
    getCoupons (page = 1, pages = 10) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}&pages=${pages}`
      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.pagination = response.data.meta.pagination
        this.coupons = response.data.data
      })
    },
    openModel (status, item) {
      switch (status) {
        case 'create':
          this.status = true
          this.tempCoupon = {}
          $('#couponModal').modal('show')
          break
        case 'edit': {
          this.status = false
          this.tempCoupon = { ...item }
          // 使用 split 切割相關時間戳
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAt
          $('#couponModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = { ...item }
          $('#delcouponModal').modal('show')
      }
    },
    updateCoupon () {
      this.isLoading = true

      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`
      let httpMethod = ''
      if (this.status) {
        httpMethod = 'post'
      } else {
        httpMethod = 'patch'
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
      }
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`
      this.$http[httpMethod](url, this.tempCoupon).then(() => {
        this.getCoupons()
        this.isLoading = false
        this.$bus.$emit('message:push', '更新成功囉~',
          'success')
        $('#couponModal').modal('hide')
      }).catch(() => {
        this.$bus.$emit('message:push',
          '出現錯誤惹，好糗Σ( ° △ °|||)︴',
          'danger')
        this.isLoading = false
      })
    },
    delCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
      this.$http.delete(url).then(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '刪除成功囉~',
          'success')
        this.getCoupons()
        $('#delcouponModal').modal('hide')
      }).catch(() => {
        this.$bus.$emit('message:push', '刪除失敗!!',
          'danger')
        this.isLoading = false
      })
    }
  }
}
</script>
