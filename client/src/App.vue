<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/_header'
export default {
  name: 'App',
  components: {
    'v-header': Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.btn-razz{
  background: rgb(255, 207, 11);
  color:black;
    border-radius: 40px;
}
</style>
