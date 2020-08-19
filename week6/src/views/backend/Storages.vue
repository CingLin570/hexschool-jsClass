.<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h2>圖片頁面</h2>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">刪除</th>
      <th scope="col">圖片庫</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in storages" :key="item.id">
      <th scope="row" width="100px"><button class="btn btn-outline-danger btn-sm" @click="openModel(item)">刪除</button></th>
      <td><img :src="item.path" alt="" class="img-fluid w-25"></td>
    </tr>
  </tbody>
  </table>
    <Pagination :pages="pagination" @emitPages="getData"/>
  <!-- 刪除Modal -->
    <div class="modal fade" id="delStorages" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <strong class="text-danger">是否刪除(刪除後將無法恢復)。</strong>
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
              @click="delStorages(tempStorages.id)"
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
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Storages',
  components: {
    Pagination
  },
  data () {
    return {
      pagination: {},
      storages: {},
      isLoading: false,
      tempStorages: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData (page = 1, paged = 10) {
      this.tempStorages = {}
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}&paged=${paged}`
      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.pagination = response.data.meta.pagination
        this.storages = response.data.data
      })
    },
    openModel (item) {
      this.tempStorages = { ...item }
      $('#delStorages').modal('show')
    },
    delStorages (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage/${id}`
      this.$http.delete(url).then(() => {
        this.isLoading = false
        this.getData()
        this.$bus.$emit('message:push', '產品刪除成功囉~',
          'success')
        $('#delStorages').modal('hide')
      })
    }
  }
}
</script>
