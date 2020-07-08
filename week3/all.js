/* global Vue */
/* eslint-disable no-new */

new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 'dfsd5g54dsg-d4g5sd-sdgswqosdk',
        title: '草莓牛奶濃縮式乳清蛋白2.5kg',
        category: '乳清蛋白',
        content: '好喝',
        description: '保留乳清蛋白含量80%以上',
        imageUrl: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
        enabled: true,
        origin_price: 1799,
        price: 1390,
        unit: '袋',
      },
      {
        id: 'rgrg55d4g-d4gd-g5dgdf25-5fdg',
        title: '咖啡口味分離式乳清蛋白2.5kg',
        category: '乳清蛋白',
        content: '好喝',
        description: '保留乳清蛋白含量80%以上',
        imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=956&q=80',
        enabled: true,
        origin_price: 1999,
        price: 1590,
        unit: '袋',
      },
      {
        id: 'g5sj5w4j8e1c92j1e4-f4s-jevd6b4',
        title: '巧克力分離式乳清蛋白2.5kg',
        category: '乳清蛋白',
        content: '好喝',
        description: '保留乳清蛋白含量80%以上',
        imageUrl: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        enabled: false,
        origin_price: 1999,
        price: 1590,
        unit: '袋',
      },
    ],
    //暫存物件，不讓原始資料被修改
    editProduct: {},
  },
  methods: {
    updateProduct: function () {
      //判別新增產品有無內容
      if (Object.keys(this.editProduct).length <= 0){return $('#productModal').modal('hide');};
      const index = this.products
        .findIndex(item => item.id === this.editProduct.id);//判別暫存物件與原始物件的id是否相同，相同就回傳索引，不相同則回傳-1
      if(index !== -1){//編輯資料
        //this.$set(target(目標),key欄位(物件屬性、陣列索引),value(值));
        //強制加入雙向綁定
        this.$set(this.products, index, Object.assign({},this.editProduct));
      }else{//新增資料
        const id = new Date().getTime();
        this.editProduct.id = id;
        this.products.push(this.editProduct);
      }
      $('#productModal').modal('hide');
      this.editProduct = {}; /* 將物件清空會觸發 Vue執行渲染畫面，也就是 v-for會更新畫面 */
      // 關鍵字 : Vue Reactivity
    },
    deleteProdcut: function(){
      const index = this.products.findIndex(item => item.id === this.editProduct.id);
      if(index !== -1){
        this.products.splice(index,1);
      }
      $('#delProductModal').modal('hide');
      this.editProduct ={};
    },
    openMedel: function (type, item) {
      switch(type){
        case 'add':
          this.editProduct={};
          document.querySelector('#exampleModalLabel > span').innerHTML='新增產品';
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.editProduct = Object.assign({},item);
          document.querySelector('#exampleModalLabel >span').innerHTML='編輯產品';
          $('#productModal').modal('show');
          break;
        case 'delete':
          $('#delProductModal').modal('show');
          this.editProduct = Object.assign({}, item);
          break;
        default:
          break;
      }
    }
    },
  });
