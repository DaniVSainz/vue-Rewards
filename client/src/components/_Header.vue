<template>
    <!-- <div class="header-container">
        <div >
            <img src="../assets/logo-razz.png" alt="">
        </div>
        <div class='rewards'>
            <h4>Rewards</h4>
        </div>
    </div> -->
    <div class="row">
    <div class="col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 logo-container center">
        <img src="../assets/logo-razz.png" alt="Fake Logo">
    </div>
    <div class='col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 rewards center'>
        <h4 class="">Rewards</h4>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
<style type="text/css">
    .logo-container{
        display: flex;
        float: left;
        height:8.6vh;
        align-items: center;
    }
    img{
        height: 60%;
        vertical-align: middle;
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
    h4{
        font-family: sans-serif;
        color:white;
        font-size:2rem;
        font-weight: 800;
    }
    .center{
        margin:0 auto;
    }
</style>

