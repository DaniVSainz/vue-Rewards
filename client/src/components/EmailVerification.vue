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
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'EmailVerification',
  components: { Spinner },
  data () {
    return {
      msg: '',
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  methods: {
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
