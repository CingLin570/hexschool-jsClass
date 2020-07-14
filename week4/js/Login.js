const uuid = '958a050f-3e4c-4878-9e46-1770b3152f41';
const apiPath = 'https://course-ec-api.hexschool.io/';
new Vue({
    el: '#app',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading:false,
        };
    },
    methods: {
        signin() {
            const api = `${apiPath}api/auth/login`;
            this.loading=true;
            //驗證帳號密碼
            axios.post(api, this.user).then((response) => {
                console.log(response);
                const token = response.data.token;
                const expired = response.data.expired;
                // 寫入 cookie token
                // expires 設置有效時間
                document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
                window.location = 'Products.html';
            }).catch((error) => {
                console.log(error);
            });
        },
    },
})