<template>
  <div class="">
    <div class="row" style='height:150px;'>
      <div class='col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 center gray center-text' >
        <p style='margin-bottom:0px;'>Here is the full list of prizes that you can win.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 center gray" style='padding-bottom:55px;'>
        <b-card-group columns class="myCardGroup">
          <b-card v-for="(prize, index) in prizes"  :key="prize._id" :title="`Win a ` + prize.name"
            :img-src='prize.image_url'
            img-alt="Image"
            img-top
            tag="article"
            class="mb-3 my-card"
            style='border:none;'
            v-bind:class="{'conditional-margin': needsMargin(index+2)}"
          >
            <div class="flex-justify"  style='height:105px;'>
              <router-link v-bind:to="'prizes/' + prize._id">
                <b-button variant="razz" style="width:160px;height:45px;">Redeem <span style="font-family: cursive;font-weight: 500;"> ></span></b-button>
              </router-link>
            </div>
        </b-card>
      </b-card-group>
    </div>
  </div>

  </div>

</template>

<script>
import PrizesService from '@/services/PrizesService'

export default {
  name: 'Prizes',
  data () {
    return {
      prizes: [],
      margin: null
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PrizesService.fetchPosts()
      this.prizes = response.data.prizes
    },
    async deletePost (id) {
      await PrizesService.deletePost(id)
      this.getPosts()
    },
    needsMargin (index) {
      // eslint-disable-next-line
      if(index % 3 == 0){
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style type="text/css">

.center-text{
  display: flex;
  justify-content: center;
  align-items: center;
}
.prizes-desc{
  height:15.8vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-margin {
  margin: 0;
}
p{
  font-size:1.4em;
}
.my-card{
  max-width: 23rem;
  color:black;
}
.my-card .card-body .card-title{
  font-weight: 900;
  opacity: 0.85;
  margin-top:35px;
  font-size:20px;
}
.flex-justify{
  display: flex;
  justify-content: center;
  align-items: center;
}
.card img{
  border-top-left-radius: calc(0.45rem - 1px);
  border-top-right-radius: calc(0.45rem - 1px);
}
.myCardGroup{
  flex-flow: wrap;
  display: flex;
  justify-content: center;
}
.conditional-margin{
  margin-left: 15px;
  margin-right:15px;
}

@media screen and (max-width: 1414px) {
  .card-body .card-title{
    height: 48px;
  }
}

</style>
