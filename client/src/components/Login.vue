<template>
  <div class="ev-login col-sm-4 offset-sm-4" v-on:keyup.enter="submit()">
    <b-alert :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged">
      <p>{{msg}}</p>
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
        class="form-control"
        placeholder="Enter your username"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button
      data-id="login.submit"
      class="btn btn-primary solid blank"
      @click="submit()"
    >
      Login &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
    </button>
    <br><br><br>
    Don’t have an account? &nbsp;
    <router-link v-bind:to="'/register'">
      Register
    </router-link>
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
      msg: '',
      dismissSecs: 10,
      dismissCountDown: 0
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
      this.msg = response.data.msg
      this.showAlert()
      this.loggingIn = false
      // eslint-disable-next-line
      if (response.status == 200) {
        AuthService.storeUserData(response.data.token, response.data.user)
        this.$events.$emit('loggedIn')
        this.$router.push({ name: 'Prizes' })
      }
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
