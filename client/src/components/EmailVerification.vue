<template>
  <div class="ev-login col-sm-4 offset-sm-4">
    <h4>Email Verification</h4>
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
    <div>
      <router-link v-bind:to="'/login'" class="user-or-register">
        Login
      </router-link>
      <router-link v-bind:to="'/register'" class="user-or-register">
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
import Spinner from '@/components/common/Spinner'
export default {
  name: 'EmailVerification',
  components: { Spinner },
  data () {
    return {
      msg: '',
      dismissSecs: 10,
      dismissCountDown: 0,
      token: ''
    }
  },
  mounted () {
    this.token = this.$route.params.token
    // eslint-disable-next-line
    if (this.token != '') {
      this.verifyEmail()
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    async verifyEmail () {
      const response = await AuthService.verifyEmail(this.token)
      this.msg = response.data.msg
      this.showAlert()
    }
  }
}
</script>

<style lang="css" scoped>
.ev-login {
  margin-top: 100px;
}
</style>
