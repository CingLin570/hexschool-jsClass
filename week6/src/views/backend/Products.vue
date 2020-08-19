<template>
  <div class="pt-2">
    <loading :active.sync="isLoading"></loading>
    <h2>後台產品頁</h2>
    <div class="text-right">
      <button type="button" class="btn btn-dark" @click="openModel('add')" data-toggle="modal" data-target="#exampleModal">建立新產品</button>
    </div>
    <table class="table table-striped">
      <thead>
    <tr>
      <th scope="col">刪除產品</th>
      <th scope="col">產品圖片</th>
      <th scope="col">產品分類</th>
      <th scope="col">產品名稱</th>
      <th scope="col">產品原價</th>
      <th scope="col">產品售價</th>
      <th scope="col">產品編輯</th>
    </tr>
  </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
        <th scope="row"><button type="button" class="btn btn-outline-danger btn-sm" @click="openModel('remove',item)">刪除</button></th>
        <td><img :src="item.imageUrl" class="img-fluid" style="height:100px" alt=""></td>
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td>{{item.origin_price | total}}</td>
        <td>{{item.price | total}}</td>
        <td>
          <button type="button" class="btn btn-outline-dark btn-sm" @click="openModel('edit',item)">編輯</button>
          <!-- <router-link :to="`/product/${item.id}`">詳細產品資訊</router-link> -->
        </td>
        </tr>
        </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="getData" />
    <!-- Modal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-xl"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯 {{ tempProduct.title }} 產品</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div
                  v-for="i in 5"
                  :key="i + 'img'"
                  class="form-group"
                >
                  <label :for="'img' + i">輸入圖片網址</label>
                  <input
                    :id="'img' + i"
                    v-model="tempProduct.imageUrl[i - 1]"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin" v-if="status.fileUploading"
                    />
                  </label>
                  <input
                    id="customFile"
                    ref="file"
                    type="file"
                    class="form-control"
                    @change="uploadFile"
                  >
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl[0]"
                  alt
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                    required
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                      required
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="text"
                      class="form-control"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品說明</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="content">產品描述</label>
                  <vue-editor
                    id="content"
                    v-model="tempProduct.content"
                  />
                  <!-- <textarea name="content" id="content" class="form-control" v-model="tempProduct.content"></textarea> -->
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.enabled"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
                      class="form-check-label"
                      for="is_enabled"
                    >是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
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
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除Modal -->
<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
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
              @click="delProduct"
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
import { VueEditor } from 'vue2-editor/dist/vue2-editor.core'

export default {
  name: 'Products',
  components: {
    Pagination,
    VueEditor
  },
  data () {
    return {
      products: {},
      pagination: {},
      tempProduct: {
        imageUrl: []
      },
      isNew: false,
      productName: '',
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  props: ['tokens'],
  created () {
    this.getData()
  },
  methods: {
    // 取得資料
    getData (page = 1, paged = 10) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}&paged=${paged}`
      this.$http.get(url)
        .then((response) => {
          this.isLoading = false
          this.products = response.data.data
          this.pagination = response.data.meta.pagination
        }).catch((err) => {
          console.log(err)
        })
    },
    // 打開暫存模板
    openModel (isNew, item) {
      switch (isNew) {
        case 'add':
          this.isNew = true
          this.tempProduct = {
            imageUrl: []
          }
          this.productName = '新增產品'
          this.isNew = true
          $('#productModal').modal('show')
          break
        case 'edit': {
          this.isNew = false
          this.isLoading = true
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`
          this.$http.get(url).then((response) => {
            this.tempProduct = response.data.data
            this.isLoading = false
            this.productName = '編輯產品'
            console.log(this.tempProduct)
            $('#productModal').modal('show')
            this.loadingBtn = ''
          })
          break
        }
        case 'remove':
          this.tempProduct = { ...item }
          $('#delProductModal').modal('show')
          break
      }
    },
    // 上傳檔案
    uploadFile () {
      const uploadedFile = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`
      this.status.fileUploading = true
      this.$http.post(url, formData, {
        'Content-Type': 'multipart/form-data'
      }).then((response) => {
        this.status.fileUploading = false
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path)
        }
      }).catch(() => {
        this.$bus.$emit('message:push',
          `檔案上傳失敗惹，好糗Σ( ° △ °|||)︴
          請檢查是不是檔案大小超過 2MB`,
          'danger')

        this.status.fileUploading = false
      })
    },
    // 上傳產品資訊
    updateProduct () {
      this.isLoading = true
      // 新增產品
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`
      let httpUrl = 'post'
      // 當點擊的是編輯按鈕更改api路徑
      if (!this.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`

        httpUrl = 'patch'
      }
      this.$http[httpUrl](url, this.tempProduct).then((response) => {
        this.isLoading = false
        this.$bus.$emit('message:push', '新增成功囉~',
          'success')

        this.getData()
        $('#productModal').modal('hide')
      }).catch((error) => {
        this.isLoading = false
        const errorData = error.response.data
        this.$bus.$emit('message:push',
          `出現錯誤!!!${errorData}`,
          'danger')
      })
    },
    delProduct () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      this.isLoading = true
      this.$http.delete(url).then(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '產品刪除成功囉~',
          'success')
        this.getData()
        $('#delProductModal').modal('hide')
      })
    }
  }
}
</script>

<style lang="css">
@import '~vue2-editor/dist/vue2-editor.css';
/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>
