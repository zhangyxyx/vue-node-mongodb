<template>
    <div style="width:100%;">
        <!--顶部的菜单-->
        <div class="homeTop">
            <div style="width:960px;margin:0 auto;height:60px;"> 
                <router-link to="/home"><h2><img src="static/home/web.svg"></h2></router-link>
                <span v-for="(item,index) in topMenu" v-on:click="clickTopMenu(item.mark,item.icon)" :class="{active:ind===item.mark}" :key="index">{{item.con}}
                </span>
                <div style="float:left;position:relative;width:202px;margin-left:90px;">
                    <input type="text" placeholder="搜索掘金">
                    <span class="glyphicon glyphicon-search" aria-hidden="true" style="position:absolute;top:24px;right:11px;width:auto"></span>
                </div>
                <!--添加 消息 个人-->
                <div class="addMessUser">
                    <span>
                        <router-link to="/graph"><img src="static/add.png"></router-link>
                    </span>
                    <span><img src="static/ling.png"></span>
                    <a title="进入管理员页面" style="width:30px;height:30px;display:block;float:left;margin-left:20px;cursor:pointer;border-shadow:50%;" v-on:click="houtai()"><img src="static/logo.png" style="width:100%"></a>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
//作为公共的组件 引入到需要的组件中
export default {
    data() {
        return {
            topMenu: [
                { con: '首页', icon: 'home',mark:'home' },
                { con: '沸点', icon: 'feidian/groom',mark:'feidian' },
                { con: '小册', icon: 'xiaoce',mark:'xiaoce' },
                // { con: '专栏', icon: 'zhuanlan/all',mark:'zhuanlan' },
                // { con: '收藏集', icon: 'collect/recommend',mark:'collect' },
                // { con: '发现', icon: 'find/all',mark:'find' },
                {con:'开源库',icon:'source',mark:'source'},
                { con: '活动', icon: 'huodong/all',mark:'huodong' },
            ],

            ind: 'home',
            mark: '',
        }
    },
    props: ["message"],
    mounted: function() {
        this.markshow();  
    },
    methods: {
        markshow() {
            this.ind = this.$route.name
        },
        clickTopMenu(i, icon) {
            this.ind = i;
            this.comMessage = icon;
            this.$router.push('/' + icon)

        },
        //进入管理员界面
        houtai() {
            this.$router.push('/houtai/login')
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../style/mixin';
/*顶部菜单*/
.homeTop {
    height: 60px;
    line-height: 60px;
    background: #fff;
    h2{
        @include left;
        margin-right: 20px;
       
        img{
            vertical-align:middle
        }
    }
    span{
        width: 70px;
        @include left;
        text-align: center;
        display: block;
        font-size: 16px;
        cursor: pointer;
        &:hover{
            @include active
        }
    }
    .active{
        @include active
    }
    input{
        @include wh(200px,32px);
        line-height: 32px;
        padding: 0px 10px;
        border: 1px solid rgba(204,204,204,.3);
        color: #d0d2d2;
    }
    
    input::-webkit-input-placeholder{
        color: #d0d2d2;
    }
    input::-moz-placeholder{
        color: #d0d2d2;
    }
    input::-ms-input-placeholder{
        color: #d0d2d2;
    }
    .login{
         width: 50px;
    }
    .addMessUser {
        @include wh(auto,60px);
        @include right;
        line-height: 60px;
        span{
            @include wh(25px,auto);
            @include left;
            display:inline-block;
            margin-left:20px;
        }
        img{
            vertical-align:middle;
            @include wh(100%,100%)
        }
    }
}
</style>