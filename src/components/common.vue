<template>
    <div style="width:100%;">
        <!--顶部的菜单-->
        <div class="homeTop">
            <div style="width:960px;margin:0 auto;"> 
                <router-link to="/home/attention?two=like"><h2><img src="static/home/web.svg"></h2></router-link>
                <span v-for="(item,index) in topMenu" v-on:click="clickTopMenu(item.mark,item.icon)" :class="{active:ind===item.mark}" :key="index">{{item.con}}
                </span>
                <div style="float:left;position:relative;width:240px;margin-left:90px;">
                    <input type="text" placeholder="搜索掘金">
                    <span class="glyphicon glyphicon-search" aria-hidden="true" style="position:absolute;top:24px;right:-19px;"></span>
                </div>
                <!--添加 消息 个人-->
                <div class="addMessUser">
                    <div style="width:25px;height:25px;">
                        <router-link to="/add"><img src="static/add.png"></router-link>
                    </div>
                    <div style="width:25px;height:25px;"><img src="static/ling.png"></div>
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
                { con: '首页', icon: 'home/attention',mark:'home' },
                { con: '专栏', icon: 'zhuanlan/all',mark:'zhuanlan' },
                { con: '收藏集', icon: 'collect/recommend',mark:'collect' },
                { con: '发现', icon: 'find/all',mark:'find' },
                {con:'开源库',icon:'source',mark:'source'},
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
            console.log(this.$route)
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
<style>
/*顶部菜单*/

.homeTop {
    height: 60px;
    line-height: 60px;
    background: #fff;
}

.homeTop h2 {
    float: left;
    margin-right: 20px;
    margin-top: 8px;
}

.homeTop span {
    width: 70px;
    floaT: left;
    text-align: center;
    display: block;
    font-size: 15px;
    cursor: pointer;
}

.homeTop span:hover {
    color: #007fff
}

.homeTop .active {
    color: #007fff
}

.homeTop input {
    height: 32px;
    width: 240px;
    line-height: 32px;
    padding: 0px 10px;
    border: 1px solid rgba(204,204,204,.3);
    color: #d0d2d2;
}
.homeTop input::-webkit-input-placeholder{
    color: #d0d2d2;
}
.homeTop input::-moz-placeholder{
    color: #d0d2d2;
}
.homeTop input::-ms-input-placeholder{
    color: #d0d2d2;
}


.homeTop .login {
    width: 50px;
}

.addMessUser {
    height: 60px;
    line-height: 60px;
}

</style>