export default{
    template: '#productModal',
    data() {
        return {
            tempProduct: {
                imageUrl: [],
            },
        };
    },
    props: {
        productid: {
            type: String,
            default: '',
        },
        status: {
            type: Object,
            default() {
                return {
                };
            },
        },
        isNew: {
            type: Boolean,
            default: true,
        },
        user: {
            type: Object,
            default() {
                return {
                };
            },
        },
    },
    methods: {
        updatedata(){
            const vm =this;
            vm.tempProduct ={
                imageUrl: [],
            };
        },
        //使用 refs 觸發getProduct方法並將暫存的id帶入
        //取得單一詳細產品資料
        //id 主要是傳入產品的 ID
        getProduct(id) {
            //使用後台更新商品資訊api
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
            axios.get(api).then((res) => {
                 // 確保資料已經回寫後在打開 Modal
                $('#productModal').modal('show');
                console.log(res);
                this.tempProduct = res.data.data;//把遠端資料與暫存資料同步，把沒有的顯示欄位的資料加入暫存
            }).catch((error) => {
                console.log(error);
            });
        },
        // 上傳產品資料
        //點擊Model的確認按鈕觸發，透過 this.isNew 的狀態將會切換新增產品或編輯產品。
        //附註新增為「post」編輯則是「patch」，patch 必須傳入產品 ID
        updateProduct() {
            const vm =this;
            // 新增商品
            let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
            let httpMethod = 'post';
            // 當不是新增商品時則切換成編輯商品 API
            if (!this.isNew) {
                api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
                httpMethod = 'patch';
            }

            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            //判別後帶入post或是patch上傳產品資料，再使用$emit帶入外層方法getProducts更新畫面
            axios[httpMethod](api, this.tempProduct).then(() => {
                $('#productModal').modal('hide');
                this.$emit('update');//傳事件getProducts到外層，執行更新畫面重新取得全部產品資料
                vm.tempProduct ={
                    imageUrl: [],
                };
            }).catch((error) => {
                console.log(error)
            });
        },
        // 上傳檔案
        uploadFile() {
            const uploadedFile = this.$refs.file.files[0];//使用 refs 觸發子元件方法，對應上傳檔案的input
            const formData = new FormData();
            formData.append('file', uploadedFile);
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/storage`;
            this.status.fileUploading = true;//上傳時loading的icon開啟
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                this.status.fileUploading = false;//上傳完成時loading的icon關閉
                if (response.status === 200) {
                    this.tempProduct.imageUrl.push(response.data.data.path);
                }
            }).catch(() => {
                console.log('上傳不可超過 2 MB');
                this.status.fileUploading = false;
            });
        },
    },
}