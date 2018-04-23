<template>
    <div class="row">
      <div class="col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 logo-container center">
          <router-link v-bind:to="'/'" >
              <img src="../assets/logo-razz.png" alt="Fake Logo" class="home">
          </router-link>
          <router-link v-bind:to="'/login'">
              Login
          </router-link>
          <router-link v-bind:to="'/register'">
              Register
          </router-link>
          <p style='color:black;'>
            {{username}}
          </p>
      </div>
      <div class='col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 rewards center'>
          <h4 class="rewards-header">Rewards</h4>
      </div>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Header',
  data () {
    return {
      username: null
    }
  },
  mounted () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      this.username = await AuthService.loadUser().user.username
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
.center{
    margin:0 auto;
}
</style>
