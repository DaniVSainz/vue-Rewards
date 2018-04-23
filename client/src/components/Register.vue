<template>
  <div class="ev-login col-sm-4 offset-sm-4">
    <spinner v-show="loggingIn" message="Logging in..."></spinner>
    <p>username: <strong>demouser</strong> <br> password: <strong>testpass</strong></p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your username"
        v-model="user.username"
      >
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your email"
        v-model="user.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="user.password"
      >
    </div>
    <button
      data-id="login.submit"
      class="btn btn-primary solid blank"
      @click="submit()"
    >
      Register &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
    </button>
    <br><br><br>
  </div>
</template>

<script>
import Spinner from '@/components/common/Spinner'
import AuthService from '@/services/AuthService'
export default {
  name: 'Register',
  components: { Spinner },
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      },
      loggingIn: false,
      error: ''
    }
  },
  methods: {
    async submit () {
      this.loggingIn = true
      const user = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email
      }
      let response = await AuthService.register(user)
      console.log(response)
      this.loggingIn = false
    }
  }
}
</script>

<style lang="css" scoped>
.ev-login {
  margin-top: 100px;
}
</style>
