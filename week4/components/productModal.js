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
        //使用 refs 觸發getProduct方法並將暫存的id帶入
        getProduct(id) {
            //使用後台更新商品資訊api
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
            axios.get(api).then((res) => {
                $('#productModal').modal('show');
                console.log(res);
                this.tempProduct = res.data.data;//把遠端資料與暫存資料同步，把沒有的顯示欄位的資料加入暫存
            }).catch((error) => {
                console.log(error);
            });
        },
        // 上傳產品資料
        updateProduct() {
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
                this.$emit('update');//傳事件getProducts到外層，執行更新畫面
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
            this.status.fileUploading = true;
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                this.status.fileUploading = false;
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