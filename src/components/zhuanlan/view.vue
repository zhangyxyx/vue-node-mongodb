<template>
<div class="main">
    <myCommon v-bind:onemessage="commonmsg"></myCommon>
    <div class="zl_top">
        <ul>
            <li :class="{action:type===item.icon}" v-for="(item,index) in lanMenu" v-on:click="typeMenu(index,item.icon)" :key="index">{{item.con}}</li>    
        </ul>
    </div>  
    <div style="width:960px;margin:20px auto;overflow:hidden;">
        <div style="width:700px;float:left;">
            <div style="padding-left:20px;height:47px;border-bottom:1px solid rgba(204,204,204,.3);background:#fff;padding-left:30px;">
                <div style="float:left;line-height:47px;font-size:16px;">原创文章</div>
                <!--热门 最新 评论-->
                <div class="zltopmenuone">
                    <div class="zltopmenuone-menu-every" :class="{action:sort===options.change}"  v-for='(options,index) in twomenu' v-on:click="sortMenu(index,options.change)" :key="index">
                        {{options.text}}
                    </div>
                </div>
            </div>
            <!--专栏内容-->
            <div class="zlCon">
                <myzlArticle v-bind:zlmessage="childMsg"></myzlArticle>
            </div>
        </div>
        <div style="width:240px;margin-left:20px;float:left;">
            <img src="/static/home/home_right_1.png" />
        </div>
    </div> 
</div> 
</template>
<script>
import common from '../common.vue'
import article from './article.vue'
export default{
    data(){
        return{
            //一级菜单
            lanMenu:[
                {con:'全部',icon:'all'},
                {con:'Android',icon:'android'},
                {con:'前端',icon:'web'},
                {con:'iOS',icon:'ios'},
                {con:'产品',icon:'products'},
                {con:'设计',icon:'desgin'},
                {con:'工具资料',icon:'tool'},
                {con:'阅读',icon:'read'},
                {con:'后端',icon:'java'},
                {con:'人工智能',icon:'rgzn'},
            ],
            //二级菜单
            twomenu: [
				{ change: 'like', text: '热门', active: 'active' },
				{ change: 'time', text: '最新' },
				{ change: 'collect', text: '评论' },
            ],
            //传给子组件的props 一级菜单
            type:this.$route.params.id,
            //二级菜单
            ind:0,
            //二级菜单 一开始选择type的时候默认是热门的
            sort:this.$route.query.sort||'like',
            //传给子组件的props
            //childMsg:{one:'all',two:'like'},
            childMsg:this.$route.params.id+":"+this.$route.query.sort||'like',
            commonmsg:1
        }
    },
    components:{
       "myCommon":common,
       "myzlArticle":article
    },
    
    mounted() {
        
	},
    methods:{
        //点击一级菜单
        typeMenu(index,con){
           this.type=con;
           this.changeClass(con,this.sort)
        },
        //点击二级菜单
        sortMenu(index,con){
            this.sort=con;
            this.changeClass(this.type,con)
        },
        //根据点击一级二级菜单来选择哪块需要显示 和地址栏需要怎么变化
        changeClass(type,sort){
            this.childMsg=type+":"+sort;
            this.$router.push({path:'/zhuanlan/'+type,query:{sort:sort}});
        }
    }
}
</script>
<style>
.zl_top{
    height:50px;
    font-size:14px;
    background:#fff;
    border-top:1px solid rgba(204,204,204,.3);
}
.zl_top ul{
    width:960px;
    height:50px;
    margin:0 auto;
    line-height:50px;
}
.zl_top li{
    padding:0px 10px;
    display:block;
    float:left;
    color:#909090;
    cursor:pointer;
}
.zl_top li:hover{
    cursor:pointer
}
.zl_top .action{
    color:#007fff
}
/*二级菜单*/
.zltopmenuone {
    width:200px;
	height: 47px;
	padding:15px 0px;
	font-size:12px;
	padding-left:20px;
    float:right;
    overflow:hidden
}
.zltopmenuone .active {
	color: #007fff
}
.zltopmenuone-menu-every {
	cursor: pointer;
	font-size: 15px;
	text-align: center;
	padding: 0px 8px;
	float: left;
	border-right:1px solid rgba(204,204,204,.3)
}
</style>
