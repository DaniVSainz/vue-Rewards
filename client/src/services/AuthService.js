import Api from '@/services/Api'

export default {

  data () {
    return {
      user: null,
      authToken: null
    }
  },

  login (params) {
    return Api().post('users/authenticate', params).catch(error => {
      return error.response
    })
  },

  register (params) {
    return Api().post('users/register', params).catch(error => {
      return error.response
    })
  },

  verifyEmail (token) {
    return Api().post('confirmation/verifyEmail', {token}).catch(error => {
      return error.response
    })
  },

  logOut () {
    this.authToken = null
    this.user = null
    localStorage.clear()
  },

  storeUserData (token, user) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  },

  loadToken () {
    const token = localStorage.getItem('id_token')
    this.authToken = token
  },

  loadUser (token) {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user == null) {
      return this.user
    } else {
      return this.user.username
    }
  },

  getProfile () {
    this.loadToken()
    console.log(this.authToken)
    return Api().get('users/profile', { headers: { Authorization: this.authToken } }).catch(error => {
      return error.response
    })
  }

}
