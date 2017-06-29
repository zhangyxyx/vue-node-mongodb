<template>
<div class="home row">
	<myCommon v-bind:message="commonmsg"></myCommon>
    <!--左侧菜单-->
    <div class="col-sm-2 home-con-menu">
      <div class="row">
      	<div class="col-md-12 menu-every" v-for='(options,index) in leftMenu' v-on:click="leftMenu(index)">
			  {{options.text}}
		</div>
      </div>
    </div>
    <!--右侧对应的内容-->
	<div class="col-sm-10">
		<div class="row">
			<!--精选-->
			<div class="col-sm-12 rightevery article" style="display:block;"><articleview></articleview></div>
			<div class="col-sm-12 rightevery contact"><contactview></contactview></div>
		</div>
		<!--分页-->
	</div>
    
</div>
</template>
<script>
import article from './article.vue'
import contact from './contact.vue'
import common from '../common.vue'
export default {
	data() {
		return{
				leftMenu:[
					{change:'tuijian',text:'推荐'},
					{change:'android',text:'Android'},
					{change:'web',text:'前端'},
					{change:'ios',text:'iOS'},
					{change:'java',text:'后端'},
					{change:'design',text:'设计'},
					{change:'produce',text:'产品'},
					{change:'article',text:'随笔/文章'},
					{change:'concat',text:'联系'}
				],
				commonmsg:0		
		}
	},
	components:{
		"articleview":article,
		"contactview":contact,
		"myCommon":common
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

/*左側菜單*/
.menu-every{
	background:rgba(234,234,234,.5);
	cursor:pointer;
	height:50px;
	line-height:50px;
	font-size:18px;
	text-align:center;
	}
.menu-every:hover{background:rgba(214,214,214,.5)}
.rightevery{display:none}
</style>










