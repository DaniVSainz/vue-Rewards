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
      console.log(error)
      return error.response
    })
  },

  register (params) {
    return Api().post('users/register', params).catch(error => {
      console.log(error)
      return error.response
    })
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
  }
}
