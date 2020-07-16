export default{
    template: '#pagination',
    data() {
        return {// 元件本身的 data，但這邊不會使用
        };
    },
    props: {
        pages: {
            type: Object,
            default() {
                return {//主要接受由外(Products)向內(pagination)傳遞的分頁物件，意指在 getProducts 取得的分頁物件
                };
            },
        },
    },
    methods: {
        //item 是你點擊的分頁按鈕，當你點第二頁就會傳入二，點第五頁就會傳入五以此類推
        emitPages(items) {
            this.$emit('emit-pages', items);//傳事件getProducts到外層，執行更新畫面
        },
    },
}