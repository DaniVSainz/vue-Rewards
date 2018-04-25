import Api from '@/services/Api'
import AuthService from '@/services/AuthService'

export default {
  fetchPosts () {
    return Api().get('prizes/')
  },

  addPost (params) {
    return Api().post('prizes/new', params)
  },

  updatePost (params) {
    return Api().put('prizes/' + params.id, params)
  },

  getPost (params) {
    return Api().get('prizes/' + params.id)
  },

  deletePost (id) {
    return Api().delete('prizes/' + id)
  },

  async claimPrize (id) {
    await AuthService.loadToken()
    return Api().put('prizes/claimprize/' + id, null, { headers: { Authorization: AuthService.authToken } }).catch(error => {
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
  },

  seedDatabase () {
    return Api().get('prizes/seed/data/').catch((err) => {
      console.log(err)
    })
  }

}
