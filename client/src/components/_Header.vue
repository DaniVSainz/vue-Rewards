<template>
    <div class="header-container">
        <div >
            <img src="~../assets/logo-razz.png" alt="">
        </div>
        <div class='rewards'>
            <h4>Rewards</h4>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
<style type="text/css">
    .header-container{
        width:70%;
        height:35%;
        /* background-color: #0274bb; */
        margin:0 auto;
    }
    .rewards{
        height:35%;
        background-color: #0274bb;
    }
    h4{
        color:white;
    }
</style>
