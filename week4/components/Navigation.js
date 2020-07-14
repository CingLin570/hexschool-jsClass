export default{
    template: '#pagination',
    data() {
        return {
        };
    },
    props: {
        pages: {
            type: Object,
            default() {
                return {
                };
            },
        },
    },
    methods: {
        emitPages(items) {
            this.$emit('emit-pages', items);//傳事件getProducts到外層，執行更新畫面
        },
    },
}