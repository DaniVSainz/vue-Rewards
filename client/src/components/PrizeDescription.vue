<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="row-box">

        <b-img v-bind:src='image_url' style="height:38vh;width:24vw;" fluid alt="Fluid image"  />
        <b-card text-variant="black" :title="`Win a ` + name" style="max-width: 23rem;">
          <hr>
          <b-btn v-b-modal.modal1 variant='razz'>Redeem</b-btn>
          <hr>
          <p>
            {{quantity}} left in stock
          </p>
        </b-card>
        <!-- Modal Component -->
        <b-modal id="modal1" ref="areYouSureModal" no-fade centered header-border-variant='border:none;'>
          <h4 class="card-title">Are you Sure?</h4>
          <div class="round-image-container">
            <b-img v-bind:src='image_url' rounded="circle"  alt="img" />
          </div>
          <p>
            Redeem for {{name}}?
          </p>
          <div slot='modal-footer' class="modal-buttons-div">
              <b-btn v-b-modal.modal2  @click="claimPrize" variant='razz'>Yes</b-btn>
              <b-button variant="gray" @click="hideModal" >Cancel</b-button>
          </div>
        </b-modal>
        <b-modal id="modal2" hide-footer no-fade centered>
          <h4 class="card-title">{{claimPrizeRes}}</h4>
          <p>
            {{msg}}
          </p>
          <router-link v-bind:to="'/'">
            <b-button variant="razz">More Prizes</b-button>
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
      id: '',
      claimPrizeRes: 'Loading....',
      msg: 'Claiming Your Prize'
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
      this.name = response.data.name
      this.description = response.data.description
      this.quantity = response.data.quantity
      this.image_url = response.data.image_url
      this.id = response.data._id
    },
    async claimPrize () {
      const response = await PostsService.claimPrize(this.id)
      this.claimPrizeRes = response.data.claimPrizeRes
      this.msg = response.data.msg
    },
    hideModal () {
      this.$refs.areYouSureModal.hide()
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
.round-image-container {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}

.round-image-container img {
  width: auto;
  height: 100%;
  margin-left: -50px;
}
</style>
