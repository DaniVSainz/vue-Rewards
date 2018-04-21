<template>

  <!-- <div class="posts">
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Post</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts" :key="post._id">
          <td>{{ post.name }}</td>
          <td>{{ post.description }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Edit</router-link> |
            <button href="" @click="deletePost(post._id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div> -->
  <div class="prizes">
    <div>
      <h3 class='no-margin'>Here is the full list of prizes that you can win.</h3>
    </div>
      <b-card-group>
      <b-card v-for="prize in prizes"  :key="prize._id" title="Card Title"
        :img-src='prize.image_url'
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
    <h3>{{prize.name}}</h3>
    <router-link v-bind:to="'prizes/' + prize._id">
      <b-button variant="razz">Redeem</b-button>
    </router-link>
   </b-card>
  </b-card-group>
  </div>

</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'Prizes',
  data () {
    return {
      prizes: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.prizes = response.data.prizes
      console.log(this.prizes)
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.getPosts()
    }
  }
}
</script>
<style type="text/css">
.prizes {
  width: 70%;
  height: auto;
  background-color: #f3f3f3;
  margin: 0 auto;
}

.no-margin {
  margin: 0;
}
</style>
