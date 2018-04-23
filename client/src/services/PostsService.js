import Api from '@/services/Api'
import AuthService from '@/services/AuthService'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  addPost (params) {
    return Api().post('posts/new', params)
  },

  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('posts/' + params.id)
  },

  deletePost (id) {
    return Api().delete('posts/' + id)
  },

  async claimPrize (id) {
    await AuthService.loadToken()
    return Api().put('posts/claimprize/' + id, null, { headers: { Authorization: AuthService.authToken } }).catch(error => {
      // eslint-disable-next-line
      if (error.response.data == 'Unauthorized') {
        return {
          data: {
            claimPrizeRes: 'Please login to claim a Prize',
            msg: `You're not logged in`
          }
        }
      } else {
        return error.response
      }
    })
  }

}
