<template>
    <div class="row">
        <div class=" col-xlg-8 col-xl-8 col-lg-12 col-sm-12 col-12 footer-container">
            <a href="" class="footer-links"> Terms & Conditions </a>
            <span class='footer-links' style="margin-right:8px;margin-left:8px;"> | </span>
            <a href="" class="footer-links"> Privacy Policy </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
<style type="text/css">
.footer-container{
    height: 225px;
    margin:0 auto;
    background-color: black;
    radial-gradient: circle at top center,white,black 70%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.footer-links{
  color:white;
  font-weight: bold;
}
</style>
