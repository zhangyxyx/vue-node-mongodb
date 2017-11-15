<template>
<div class="col-sm-2">
    <!--顶部的菜单-->
    <div >
	<div class="hmenu">
		<span v-for="(item,index) in topMenu" v-on:click="clickTopMenu(index,item.icon)" :class="{active:ind===index}" :key="index">{{item.con}}
        </span>   
	</div>
    </div>
</div>
</template>
<script>
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-table/dist/bootstrap-table.min.js';
//作为公共的组件 引入到需要的组件中
export default{
    data(){
        return{
            topMenu:[
                {con:'首页',icon:'home'},
                {con:'专栏',icon:'zhuanlan'},
                {con:'收藏集',icon:'collect'},
                {con:'发现',icon:'find'},
                {con:'开源库',icon:'source'},
            ], 
            ind:0,
            mark:'',
        }
    },
    props:["message"],
    mounted:function(){
        this.markshow();
    },
    methods:{
        markshow(){
            this.ind=this.message
        },
        clickTopMenu(i,icon){
            this.ind=i;
            this.comMessage=icon;
            this.$router.push('/houtai/'+icon)

        }
    }
}
</script>

<style lang="scss" scoped>
@import './style/bootstrap/dist/css/bootstrap.min.css';
@import '../../style/mixin';
/*顶部菜单*/
.hmenu{
    background:#fff;
    @include wh(240px,auto);
    @include left;
    h2{
        text-align:center;
        margin-top:0px;
    }
    span{
        height:60px;
        line-height:60px;
        text-align:center;
        display:block;
        font-size:17px;
        cursor:pointer;
        &:hover{
            @include active;
        }
    }
    .active{
        color:#007fff
    }
}
.homeTop{
    input{
        @include wh(240px,32px);
        line-height:32px;
        padding:0px 10px;
        border:1px solid #ccc;
        color:#71777c;
        outline:none;
    }
}
</style>