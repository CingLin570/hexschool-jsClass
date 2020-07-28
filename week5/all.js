import zh from './zh_TW.js';

// 自定義設定檔案，錯誤的 className
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// 載入自訂規則包
VeeValidate.localize('tw', zh);

// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 掛載 Vue-Loading 套件
Vue.use(VueLoading);
// 全域註冊 VueLoading 並標籤設定為 loading
Vue.component('loading', VueLoading);

Vue.filter('total', function (num) {
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + parts.join('.');
})

new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {},
    status: {
      loadingItem: '',
    },
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    cart: {},
    cartTotal: 0,
    cartQuantity: 0,
    isLoading: false,
    UUID: '958a050f-3e4c-4878-9e46-1770b3152f41',
    APIPATH: 'https://course-ec-api.hexschool.io',
  },
  //初始化更新產品列表與購物車頁面
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/products?page=${page}`;
      axios.get(url).then((response) => {
        this.products = response.data.data;
        this.isLoading = false;
      });
    },
    //按鈕查看更多，使用前台取得單一商品細節api。
    getDetailed(id) {
      //判別狀態
      this.status.loadingItem = id;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/product/${id}`;
      axios.get(url).then((response) => {
        // this.tempProduct = response.data.data;
        // 由於 tempProduct 的 num 沒有預設數字
        // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題，不然(請選擇)value=0的欄位不會顯示
        // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set
        // this.$set(this.tempProduct, 'num', 0);
        this.tempProduct = {
          ...response.data.data,
          num: 1
        };
        $('#productModal').modal('show');
        this.status.loadingItem = '';
      });
    },
    // 使用api新增某一筆購物車資料。
    addToCart(item, quantity = 1) {
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
      // api必要欄位
      const cart = {
        product: item.id,
        quantity,
      };

      axios.post(url, cart).then(() => {
        this.isLoading = false;
        $('#productModal').modal('hide');
        this.cartTotal = 0;
        this.cartQuantity = 0;
        this.getCart();
      }).catch((error) => {
        this.isLoading = false;
        console.log(error.response.data.errors);
        alert('商品已加入購物車');
        $('#productModal').modal('hide');
      });
    },
    // 使用api取得購物車列表。
    getCart() {
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

      axios.get(url).then((response) => {
        this.cart = response.data.data;
        // 累加總金額
        this.cart.forEach((item) => {
          this.cartTotal += (item.product.price * item.quantity);
          this.cartQuantity += item.quantity;
        });
        this.isLoading = false;
      });
    },
    // 使用api更新某一筆購物車資料。
    quantityUpdata(id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return;

      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
      // 必要欄位
      const data = {
        product: id,
        quantity: num,
      };

      axios.patch(url, data).then(() => {
        this.cartTotal = 0;
        this.cartQuantity = 0;
        this.isLoading = false;
        this.getCart();
      });
    },
    // 使用api刪除購物車全部資料
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/all/product`;

      axios.delete(url)
        .then(() => {
          this.cartTotal = 0;
          this.cartQuantity = 0;
          this.isLoading = false;
          this.getCart();
        });
    },
    // 使用api刪除某一筆購物車資料。
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/${id}`;

      axios.delete(url).then(() => {
        this.cartTotal = 0;
        this.cartQuantity = 0;
        this.isLoading = false;
        this.getCart();
      });
    },
    // 使用api新增一筆訂單。
    createOrder() {
      this.isLoading = true;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/orders`;

      axios.post(url, this.form).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false;
          // 跳出提示訊息
          $('#orderModal').modal('show');

          // 重新渲染購物車
          this.getCart();
        }
      }).catch((error) => {
        this.isLoading = false;
        console.log(error.response.data.errors);
      });
    },
  },
});