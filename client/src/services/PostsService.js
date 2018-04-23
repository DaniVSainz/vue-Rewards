import Api from '@/services/Api'

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

  claimPrize (id) {
    console.log(id)
    return Api().put('posts/claimprize/' + id).catch(error => {
      // eslint-disable-next-line
      if (error.response.data == 'Unauthorized') {
        return {response: {
          data: {
            claimPrizeRes: 'Please login to claim a Prize',
            msg: `You're not logged in`
          }
        }}
      }
      return error.response
    })
  }

}
