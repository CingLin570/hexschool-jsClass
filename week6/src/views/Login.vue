<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
      <div class="d-flex justify-content-center">
      <form style="width:500px" @submit.prevent="signin">
          <h2>登入頁面</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" v-model="user.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" v-model="user.password" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-success">登入</button>
      </form>
      </div>
  </div>
</template>

<script>
export default {
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

          document.cookie = `hextoken=${token};expires=${new Date(expired * 1000)};`
          this.$router.push('/admin/products')
        }).catch((err) => {
          this.isLoading = false
          console.log(err)
        })
    }
  }
}
</script>
