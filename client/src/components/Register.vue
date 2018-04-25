<template>
  <div class="ev-login col-sm-4 offset-sm-4" v-on:keyup.enter="submit()">
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
    <spinner v-show="loggingIn" message="Registering user..."></spinner>
    <p>username: <strong>demouser</strong> <br> password: <strong>testpass</strong></p>
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
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Repeat your password"
        v-model="user.passwordB"
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
import Validator from '@/services/Validator'
export default {
  name: 'Register',
  components: { Spinner },
  data () {
    return {
      user: {
        username: '',
        password: '',
        passwordB: '',
        email: ''
      },
      loggingIn: false,
      error: '',
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  methods: {
    async submit () {
      this.loggingIn = true
      const user = {
        username: this.user.username,
        password: this.user.password,
        passwordB: this.user.passwordB,
        email: this.user.email
      }
      if (!Validator.validateRegister(user)) {
        this.error = 'Please fill in all fields'
        return this.showError()
      }

      if (!Validator.validateEmail(user.email)) {
        this.error = 'Please input a valid email'
        return this.showError()
      }

      if (!Validator.validatePassword(user)) {
        this.error = `Passwords aren't the same`
        return this.showError()
      }
      let response = await AuthService.register(user)
      this.error = response.data.msg
      this.showAlert()
      this.loggingIn = false
      // eslint-disable-next-line
      if (response.status == 200) {
        await AuthService.storeUserData(response.data.token, response.data.user)
        await this.$events.$emit('loggedIn')
        setTimeout(() => {
          this.$router.push({ name: 'Prizes' })
        }, 3500)
      }
    },

    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    showError () {
      this.showAlert()
      this.loggingIn = false
      return false
    }
  }
}
</script>

<style lang="css" scoped>
.ev-login {
  margin-top: 100px;
}
</style>
