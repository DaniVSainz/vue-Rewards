export default {
  validateRegister (user) {
    // eslint-disable-next-line
    if (user.email == '' || user.username == '' || user.password == '') {
      return false
    } else {
      return true
    }
  },

  validatePassword (user) {
    // eslint-disable-next-line
    if (user.password != user.passwordB || user.password.length == 0) {
      return false
    } else {
      return true
    }
  },

  validateEmail (email) {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
}
