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
      class="btn btn-primary solid blank js-login__submit"
      @click="submit()"
    >
      Login &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
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
        password: ''
      },
      loggingIn: false,
      error: ''
    }
  },
  methods: {
    async submit () {
      this.loggingIn = true
      const credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      let response = await AuthService.login(credentials)
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
