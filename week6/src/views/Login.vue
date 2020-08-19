<template>
  <section class="home d-flex align-items-center">
    <div class="container-fluid">
      <loading :active.sync="isLoading"></loading>
      <div class="d-flex justify-content-center">
        <validation-observer v-slot="{ invalid }">
          <form style="width:500px" @submit.prevent="signin" class="p-5 rounded formSignin">
            <h2>登入頁面</h2>
            <div class="form-group text-left">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="exampleInputEmail1">電子信箱</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="user.email"
                  :class="classes"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="請輸入電子信箱"
                />
                <span
                  v-if="errors[0]"
                  class="text-danger"
                >{{ `帳號${errors[0].slice(6, errors[0].length)}` }}</span>
              </validation-provider>
            </div>
            <div class="form-group text-left">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="exampleInputPassword1">密碼</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  :class="classes"
                  id="password"
                  placeholder="請輸入密碼"
                />
                <span
                  v-if="errors[0]"
                  class="text-danger"
                >{{ `密碼${errors[0].slice(9, errors[0].length)}` }}</span>
              </validation-provider>
            </div>
            <button type="submit" class="btn btn-dark" :disabled="invalid">登入</button>
          </form>
        </validation-observer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: '',
      isLoading: false
    }
  },
  methods: {
    signin () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/auth/login`
      this.$http.post(url, this.user)
        .then((response) => {
          console.log(response)
          this.isLoading = false
          const expired = response.data.expired
          const token = response.data.token
          this.$bus.$emit('message:push',
            '登入成功',
            'success')
          document.cookie = `hextoken=${token};expires=${new Date(expired * 1000)};`
          this.$router.push('/admin/products')
        }).catch((error) => {
          this.$bus.$emit('message:push',
            `登入失敗惹，好糗Σ( ° △ °|||)︴
            ${error}`,
            'danger')
          this.isLoading = false
          console.log(error)
        })
    }
  }
}
</script>

<style>
.home {
  background: url( "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80" );
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
}
.formSignin {
  background-color: rgba(255, 253, 253, 0.9);
}
</style>
