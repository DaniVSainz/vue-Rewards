<template>
  <div class="">
    <div class="row" >
      <div class="col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 center gray" style='padding-top:35px;padding-bottom:50px;'>
        <div class="row">

          <div class="col-xlg-9 col-xl-9 col-lg-12 col-sm-12 col-12 center desc-top">
            <div style="width:50%;">
              <b-img v-bind:src='image_url'  style="width:100%;height:auto" fluid-grow alt="Fluid image"  />
            </div>

            <b-card text-variant="black" style="height:300px;" class="style-card">
              <h4 class="my-card-header" style='display:flex;'>Win a {{name}}</h4>
              <hr style='margin-top:0px;margin-bottom:30px;'>
              <b-btn v-b-modal.modal1 variant='razz' class="redeem-button"><span class="center">Reedem <span style="font-family: cursive;font-weight: 500;"> ></span></span></b-btn>
              <hr style='margin-top:30px;margin-bottom:5px;'>
              <p style="display:flex;font-size:12px;">
                {{quantity}} left in stock
              </p>
            </b-card>
          </div>

        <!-- Modal Component -->
        <b-modal id="modal1" ref="areYouSureModal" no-fade centered body-class='prize-modal-body'>
          <h4 class="card-title">Are you Sure?</h4>
          <div class="round-image-container">
            <b-img v-bind:src='image_url' rounded="circle"  alt="img" />
          </div>
          <p>
            Redeem for {{name}}?
          </p>
          <div slot='modal-footer' class="modal-buttons-div">
              <b-btn v-b-modal.modal2  @click="claimPrize" variant='razz' style="width:155px;">Yes</b-btn>
              <div style="width:20px;height:1px;"></div>
              <b-button variant="gray" @click="hideModal" class="hideModal" >Cancel</b-button>
          </div>
        </b-modal>
        <b-modal id="modal2" hide-footer no-fade centered body-class='prize-modal-2'>
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
            <h3 class="card-title" style='font-weight:800;font-size:1.2rem;margin-top:0px;'>
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
import PrizesService from '@/services/PrizesService'
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
      const response = await PrizesService.getPost({
        id: this.$route.params.id
      })
      this.name = response.data.name
      this.description = response.data.description
      this.quantity = response.data.quantity
      this.image_url = response.data.image_url
      this.id = response.data._id
    },
    async claimPrize () {
      const response = await PrizesService.claimPrize(this.id)
      this.claimPrizeRes = response.data.claimPrizeRes
      this.msg = response.data.msg
      console.log(response.data)
      if (response.data.prize) {
        this.setPrize(response.data.prize)
      }
    },
    hideModal () {
      this.$refs.areYouSureModal.hide()
    },
    setPrize (prize) {
      this.name = prize.name
      this.description = prize.description
      this.quantity = prize.quantity
      this.image_url = prize.image_url
      this.id = prize._id
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
  margin-bottom:20px;
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
  display: flex;
  justify-content: space-between;
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
.modal-buttons-div{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.hideModal{
  border-radius: 40px;
  width:155px;
}

.style-card{
  min-width:460px;
}

@media screen and (max-width: 1385px) and (min-width: 1200px) {
  .style-card{
    min-width: 300px;
  }
}
@media screen and (max-width: 1570px) {
  .desc-top{
    display:-webkit-box;
  }
}
.modal-content .modal-header{
  padding-top:0px;
  padding-bottom:0px;
}
.prize-modal-body{
  padding-top:0px !important;
}
.prize-modal-body h4{
  font-weight: 900;
  opacity: 0.85;
  font-size:30px;
  margin-bottom:15px;
}
.prize-modal-2{
  padding-top:0px !important;
}
.prize-modal-2 h4{
  font-weight: 900;
  opacity: 0.85;
  font-size:25px;
  margin-bottom:15px;
}
</style>
