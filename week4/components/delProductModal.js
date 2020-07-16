export default {
    template: '#delProductModal',
    data() {
        return {
        };
    },
    props: {
        tempProduct: {
            type: Object,
            default() {
                return {
                    imageUrl: [],
                };
            },
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
        // 刪除產品
        //透過在 openModal 傳入的 this.tempProduct，並撈取 this.tempProduct.id 來刪除產品。
        //主要是因為在 delModal 會使用到產品的一些資訊，因此會需要拷貝一整份過來。
        delProduct() {
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;

            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.delete(url).then(() => {
                $('#delProductModal').modal('hide');
                this.$emit('update');//傳事件getProducts到外層，執行更新畫面
            });
        },
    }
}