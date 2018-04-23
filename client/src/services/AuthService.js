import Api from '@/services/Api'

export default {
  login (params) {
    return Api().post('users/authenticate', params)
  },

  register (params) {
    return Api().post('users/register', params).catch(error => {
      console.log(error)
      return error.response
    })
  }
}
