<template>
<div class="container home-con">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app',
  
}
</script>

<style>
.home-con{border:1px solid #000;}
.home-con-menu{border:1px solid #ccc;}
.menu-every{height:60px;line-height:60px;cursor:pointer;text-align:center;border-bottom:1px solid #000;}
.menu-every:hover{background:rgba(0,0,0,.2);}
.home-con-right{border:1px solid yellow}
</style>
