<template>
    <div class="row" >
      <div class="col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 logo-container center">
          <router-link v-bind:to="'/'" >
              <img src="../assets/logo-razz.png" alt="Fake Logo" class="home">
          </router-link>
          <div style='height:auto;display:flex;' >
              <b-dropdown variant="link" size="lg" no-caret>
                <template slot="button-content">
                  <span class="" v-if="!username">Register/Login</span>
                  <div v-else style="display:flex;">
                    <div class="user-circle">
                      <span style="color:black;">{{username.charAt(0).toUpperCase()}}</span>
                    </div>
                    <div style="display:flex;align-items:center;margin-left:10px;">
                      <span class="username">{{username}}</span>
                    </div>
                  </div>
                </template>
                <b-dropdown-item v-if="!username" >
                  <router-link v-bind:to="'/login'" >
                    Login
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#" v-if="!username">
                  <router-link v-bind:to="'/register'" >
                    Register
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <router-link v-bind:to="'/prizes'" >
                    Prizes
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="logOut()" style='color:#007bff;'>
                    Logout
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="seedDatabase()" style='color:#007bff;'>
                    Re-Seed-DB
                </b-dropdown-item>
              </b-dropdown>
          </div>
      </div>
      <div class='col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 rewards center'>
          <h4 class="rewards-header">Rewards</h4>
      </div>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService'
import PrizeService from '@/services/PrizesService'
export default {
  name: 'Header',
  data () {
    return {
      username: null
    }
  },
  mounted () {
    this.loadUser()
    this.$events.$on('loggedIn', () => this.loadUser())
  },
  methods: {
    async loadUser () {
      this.username = await AuthService.loadUser()
    },
    logOut () {
      AuthService.logOut()
      this.username = null
    },
    async getProfile () {
      console.log(await AuthService.getProfile())
    },
    async seedDatabase () {
      const response = await PrizeService.seedDatabase()
      // eslint-disable-next-line
      if (response.data.msg == 'Success') {
        console.log(response.data.msg)
        alert(`Dropped prize collection and inserted new prizes with fresh quantities.`)
        location.reload()
      }
    }
  }
}
</script>
<style type="text/css">
.logo-container{
    display: flex;
    float: left;
    height:8.6vh;
    align-items: center;
    justify-content: space-between;
}
.home{
    height: 3em;
    vertical-align: middle;
    margin-left: 0.8em;
}
.header-container{
    width:70%;
    height:35%;
    /* background-color: #0274bb; */
    margin:0 auto;
}
.rewards{
    height: 20.3vh;
    background-color: #0274bb;
    display: flex;
    align-items: center;
    justify-content: center;
}
.rewards-header{
    font-family: sans-serif;
    color:white;
    font-size:2rem;
    font-weight: 800;
}
.user-or-register{
  vertical-align: middle;
}
.user-circle{
  height: 45px;
  width: 45px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.username{
  color: black;
  font-size: small;
  font-weight: 600;
}
</style>
