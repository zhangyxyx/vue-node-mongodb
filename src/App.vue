<template>
<div class="home-con">
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'app',
 
}
</script>
<style>
.home-con{min-width:1000px;}
body{
  color:#71777c;
}
.commonWM{
  width:960px;
  margin:0 auto;
}
input{
  outline:none;
}
</style>


