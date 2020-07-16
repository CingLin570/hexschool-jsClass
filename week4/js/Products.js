import pagination from '../components/Navigation.js';
import productModal from '../components/productModal.js';
import delProductModal from '../components/delProductModal.js';

new Vue({
    el: '#app',
    //把元件拆出來，使用區域註冊
    components:{
        pagination,
        productModal,
        delProductModal
    },
    data() {
        return {
            products: [],//放置 AJAX 回來的產品資料。
            pagination: {},//放置分頁資料用。
            tempProduct: {
                imageUrl: [],// 暫存資料用，必須預先定義 imageUrl 並且是一個陣列，否則新增或更新會出現錯誤。
            },
            isNew: false,//用於判斷接下來的行為是新增產品或編輯產品。
            //用於切換上傳圖片時的小 icon，主要是增加使用者體驗。
            status: {
                fileUploading: false,
            },
            //底下分別有 token 的放置處，但主要必須注意 uuid 需改成自己的。
            user: {
                token: '',
                uuid: '958a050f-3e4c-4878-9e46-1770b3152f41',
            },
            loading:true,
        };
    },
    /*
    生命週期 Created
    主要用於取得 token 若沒有使用者沒有 token 則返回到登入畫面，若有則執行getProducts()的方法。
   */
    created() {
        // 取得 token 的 cookies
        // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 若無法取得 token 則返回 Login 頁面
        if (this.user.token === '') {
            window.location = 'Login.html';
        }
         // 執行取得全部產品的行為
        this.getProducts();
    },
    methods: {
        signOut: function () {
            document.cookie = `token=;expires=; path=/`;
            window.location = "Login.html";
        },
        // 取得產品資料
        //後端 page 頁碼，預設值是第一頁
        getProducts(page = 1) {
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.get(api).then((response) => {
                console.log(response);
                this.products = response.data.data;// 取得產品列表
                this.pagination = response.data.meta.pagination;// 取得分頁資訊
                console.log(typeof(this.pagination.total_pages))
                this.loading = false;//當資料讀取完成，關閉loading圖示
            });
        },
        // 開啟 Modal 視窗
        //isNew 判斷目前是否為新增(true)或是編輯(false)
        //item 物件，主要用於傳入要編輯或刪除的產品資料
        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    // 新增之前必須先清除原有可能暫存的資料
                    this.tempProduct = {
                        imageUrl: [],
                    };
                    this.isNew = true;//// 切換狀態為 true 代表新增
                    this.$refs.productModel.updatedata();
                    document.querySelector('#exampleModalLabel > span').innerHTML='新增產品';
                    $('#productModal').modal('show');// // 切換完畢並清空資料後開啟 Modal，bs4關閉Model的jQuery語法
                    break;
                case 'edit':
                    document.querySelector('#exampleModalLabel > span').innerHTML='編輯產品';
                    this.tempProduct = Object.assign({}, item);
                    // 使用 refs 觸發子元件方法，要先在HTML標籤上加上ref
                    // 由於描述欄位是必須透過取得單一產品的方式，因此會執行 AJAX
                    this.$refs.productModel.getProduct(this.tempProduct.id);
                    this.isNew = false;// 切換狀態為 false 代表編輯
                    break;
                case 'delete':
                    // 由於目前範本僅有一層物件，因此使用淺拷貝
                    this.tempProduct = Object.assign({}, item);
                    // 拷貝完畢後開啟 Modal
                    $('#delProductModal').modal('show');
                    break;
                default:
                    break;
            }
        },
    },
})
