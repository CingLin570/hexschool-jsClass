import pagination from '../components/Navigation.js';
import productModal from '../components/productModal.js';
import delProductModal from '../components/delProductModal.js';

new Vue({
    el: '#app',
    components:{
        pagination,
        productModal,
        delProductModal
    },
    data() {
        return {
            products: [],
            pagination: {},
            tempProduct: {
                imageUrl: [],
            },
            isNew: false,
            status: {
                fileUploading: false,
            },
            user: {
                token: '',
                uuid: '958a050f-3e4c-4878-9e46-1770b3152f41',
            },
            loading:true,
        };
    },
    created() {
        // 取得 token 的 cookies
        // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 若無法取得 token 則返回 Login 頁面
        if (this.user.token === '') {
            window.location = 'Login.html';
        }

        this.getProducts();
    },
    methods: {
        signOut: function () {
            document.cookie = `token=;expires=; path=/`;
            window.location = "Login.html";
        },
        // 取得產品資料
        getProducts(page = 1) {
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.get(api).then((response) => {
                console.log(response);
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
                this.loading = false;
            });
        },
        // 開啟 Modal 視窗
        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    this.tempProduct = {
                        imageUrl: [],
                    };
                    this.isNew = true;
                    document.querySelector('#exampleModalLabel > span').innerHTML='新增產品';
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    document.querySelector('#exampleModalLabel > span').innerHTML='編輯產品';
                    this.tempProduct = Object.assign({}, item);
                    // 使用 refs 觸發子元件方法，要先在HTML標籤上加上ref
                    this.$refs.productModel.getProduct(this.tempProduct.id);
                    this.isNew = false;
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#delProductModal').modal('show');
                    break;
                default:
                    break;
            }
        },
    },
})
