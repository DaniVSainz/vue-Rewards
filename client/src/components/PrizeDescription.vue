<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="row-box">

        <b-img v-bind:src='image_url' style="height:38vh;width:24vw;" fluid alt="Fluid image"  />
        <b-card text-variant="black" :title="name" style="max-width: 23rem;">
          <!-- <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p> -->
          <!-- <b-button href="#" variant="razz">Redeem</b-button> -->
          <hr>
          <b-btn v-b-modal.modal1 variant='razz'>Launch demo modal</b-btn>
          <hr>
          <p>
            {{quantity}} left in stock
          </p>
        </b-card>
        <!-- Modal Component -->
        <b-modal id="modal1" no-fade hide-backdrop='true' centered>
          <h4>Are you Sure?</h4>
          <b-btn v-b-modal.modal2  @click="claimPrize" variant='razz'>Launch demo modal</b-btn>
        </b-modal>
        <b-modal id="modal2" no-fade centered>
          <h4>Are you Sure?</h4>
          <router-link v-bind:to="'/'">
            <b-button variant="razz">Redeem</b-button>
          </router-link>
        </b-modal>
        </div>
      </div>
    </div>
    <div class="row">
      <hr>
      <div class="row-box">
        <h4 class="card-title">
          Description
        </h4>
        <p>
          {{description}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'PrizeDescription',
  data () {
    return {
      name: '',
      description: '',
      quantity: 0,
      image_url: '',
      id: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      console.log(response)
      this.name = response.data.name
      this.description = response.data.description
      this.quantity = response.data.quantity
      this.image_url = response.data.image_url
      this.id = response.data._id
    },
    async claimPrize () {
      await PostsService.claimPrize(this.id)
    }
  }
}
</script>
<style type="text/css">
.posts{
  background-color: #f3f3f3;
  width:70%;
  margin:0 auto;
}
.card-title{
  color:black;
  font-weight: 400;
}
.row-box{
  display:flex;
  margin:0 auto;
}
</style>
