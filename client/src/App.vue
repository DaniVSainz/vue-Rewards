<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from './components/_header'
import Footer from './components/_footer'
export default {
  name: 'App',
  components: {
    'v-header': Header,
    'v-footer': Footer
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

.modal-backdrop{
  width: 70%;
  margin: 0 auto;
}
.modal-header{
  border-bottom:none;
}
.modal-footer{
  border-top:none;
}
.close{
  font-family: initial;
  font-size:4em;
  font-weight:100;
  color:black;
  opacity:1;
}
html, body {
    max-width: 100%;
    overflow-x: hidden;
}
</style>
