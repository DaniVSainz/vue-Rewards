<template>
  <div class="ev-login col-sm-4 offset-sm-4">
    <b-alert :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged">
      <p>{{error}}</p>
      <b-progress variant="warning"
      :max="dismissSecs"
      :value="dismissCountDown"
      height="4px">
    </b-progress>
    </b-alert>
    <spinner v-show="loggingIn" message="Logging in..."></spinner>
    <p>username: <strong>demouser</strong> <br> password: <strong>testpass</strong></p>
    <div class="form-group">
      <input
        type="text"
        data-id="login.username"
        class="form-control js-login__username"
        placeholder="Enter your username"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control js-login__password "
        placeholder="Enter your password"
        v-model="credentials.password"
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
    <a href="#">Forgot your password?</a><br>
    Don’t have an account? &nbsp;<a href="#">Sign up here.</a>

  </div>
</template>

<script>
import Spinner from '@/components/common/Spinner'
import AuthService from '@/services/AuthService'
export default {
  name: 'Login',
  components: { Spinner },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loggingIn: false,
      error: '',
      dismissSecs: 10,
      dismissCountDown: 0,
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
      this.error = response.data.msg
      this.showAlert()
      this.loggingIn = false
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style lang="css" scoped>
.ev-login {
  margin-top: 100px;
}
</style>
