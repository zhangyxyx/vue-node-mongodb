<template>
<div class="row">
    <!--左侧菜单-->
    <div class="col-sm-2 home-con-menu">
      <div class="row">
      	<div class="col-md-12 menu-every" v-for='(options,index) in options' v-on:click="clickmenu(index)">
			  {{options.text}}
		</div>
       
      </div>
    </div>
    <!--右侧对应的内容-->
	<div class="col-sm-10">
		<div class="row">
			<div class="col-sm-12 rightevery"><articleview></articleview></div>
			<div class="col-sm-12 rightevery"><contactview></contactview></div>
		</div>
	</div>
    
</div>
</template>
<script>
import article from './article.vue'
import contact from './contact.vue'
export default {
	data() {
		return{
			options:
				[
				{change:'article',text:'随笔/文章'},
				{change:'concat',text:'联系'}
				]	,
					
		}
	},
	components:{
		"articleview":article,
		"contactview":contact
	},

	methods:{
		//切换左边的菜单
		clickmenu(menu){
			$(".rightevery").eq(menu).css({display:"block"}).siblings().css({display:"none"})
		},
	}
}

</script>
<style>
.rightevery{display:none}
</style>










