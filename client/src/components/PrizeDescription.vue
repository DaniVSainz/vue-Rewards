<template>
  <div class="">
    <div class="row" >
      <div class="col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 center gray" style='padding-top:35px;padding-bottom:50px;'>
        <div class="row">

          <div class="col-xlg-9 col-xl-9 col-lg-12 col-sm-12 col-12 center flex-between desc-top">
            <b-img v-bind:src='image_url' style="height:42vh;width:24vw;" fluid alt="Fluid image"  />
            <b-card text-variant="black" style="min-width:460px;height:300px;">
              <h4 class="my-card-header" style='display:flex;'>Win a {{name}}</h4>
              <hr style='margin-top:0px;margin-bottom:30px;'>
              <b-btn v-b-modal.modal1 variant='razz' class="redeem-button"><span class="center">Reedem ></span></b-btn>
              <hr style='margin-top:30px;margin-bottom:5px;'>
              <p style="display:flex;">
                {{quantity}} left in stock
              </p>
            </b-card>
          </div>

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
      <div class="col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 center gray">
       <div class="row">
         <div class="col-xlg-9 col-xl-9 col-lg-12 col-sm-12 col-12 center gray desc-box flex-between">
            <h3 class="card-title" style='font-weight:800;font-size:1.2rem;'>
              Description
            </h3>
            <p class="text-left" style='font-size:1em;margin-left:60px;color:#242527;'>
              {{description}}
            </p>
       </div>
      </div>
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
/* .row-box{
  display:flex;
  margin:0 auto;
} */
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
.desc-box{
  border-top: 1px solid #e1e1e1;;
  padding: 60px 0px 70px 0px;
}
.flex-between{
  display: flex;
  justify-content: space-between;
}
.desc-top{
  padding-left:0px;
  padding-right:0px;
}
.my-card-header{
  height:100px;
  font-weight:800;
  font-size:30px;
  margin-bottom:0px;
}
.redeem-button{
  display:flex;
  width: 215px;
  height: 45px;
}
</style>
