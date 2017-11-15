<template>
<div class="main">
    <myCommon v-bind:onemessage="commonmsg"></myCommon>
    <div class="zl_top">
        <ul>
            <li :class="{active:type===item.icon}" v-for="(item,index) in lanMenu" v-on:click="typeMenu(index,item.icon)" :key="index">{{item.con}}</li>    
        </ul>
    </div>  
    <div style="width:960px;margin:20px auto;overflow:hidden;">
        <div style="width:700px;float:left;">
            <!--专栏内容-->
            <div class="zlCon">
                <myzlArticle v-bind:message="childMsg"></myzlArticle>
            </div>
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
                {con:'今日最热',icon:'all'},
                {con:'本周最热',icon:'android'},
                {con:'本月最热',icon:'web'},
            ],
            //传给子组件的props 一级菜单
            type:this.$route.params.id,
            //二级菜单
            ind:0,

            //传给子组件的props
            //childMsg:{one:'all',two:'like'},
            childMsg:this.$route.params.id,
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
<style lang="scss" scoped>
@import '../../style/mixin';
/*一级菜单*/
.zl_top{
    height:50px;
    font-size:14px;
    background:#fff;
    border-top:1px solid rgba(204,204,204,.3);
    ul{
        width:960px;
        height:50px;
        margin:0 auto;
        line-height:50px;
    }
    li{
        padding:0px 10px;
        display:block;
        float:left;
        color:#909090;
        cursor:pointer;
        &:hover{
            cursor:pointer;
            @include active
        }
    }
    .active{
        @include active
    }
}
/*二级菜单*/
.zltopmenuone{
    width:200px;
    padding:15px 0px;
	font-size:12px;
	padding-left:20px;
    float:right;
    overflow:hidden
    .active{
        @include active;
    }
    .zltopmenuone-menu-every {
        cursor: pointer;
        font-size: 15px;
        text-align: center;
        padding: 0px 8px;
        float: left;
        border-right:1px solid rgba(204,204,204,.3)
    }   
}


</style>
