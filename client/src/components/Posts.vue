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
    <div>
      <div v-for="prize in prizes" :key="prize._id">
        <h4>{{prize.name}}</h4>
        <p>{{prize.description}}</p>
        <img :src="prize.image_url" alt="">
      </div>
    </div>
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

.prizes{
  width:70%;
  height:65vh;
  background-color:#f3f3f3;
  margin: 0 auto;
}

.no-margin{
  margin:0;
}

.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
