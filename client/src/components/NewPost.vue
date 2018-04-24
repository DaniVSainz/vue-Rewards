<template>
  <div class="posts">
    <h1>Add Post</h1>
      <div class="form">
        <div>
          <input type="text" name="name" placeholder="Name" v-model="name">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <input type="text" name="name" placeholder="Quantity" v-model="quantity">
        </div>
        <div>
          <input type="text" name="name" placeholder="image_url" v-model="image_url">
        </div>
        <div>
          <button class="app_post_btn" @click="addPost">Add</button>
        </div>
      </div>
  </div>
</template>

<script>

import PrizesService from '@/services/PrizesService'
export default {
  name: 'NewPost',
  data () {
    return {
      name: '',
      description: '',
      quantity: 0,
      image_url: ''
    }
  },
  methods: {
    async addPost () {
      await PrizesService.addPost({
        name: this.name,
        description: this.description,
        quantity: this.quantity,
        image_url: this.image_url
      })
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
