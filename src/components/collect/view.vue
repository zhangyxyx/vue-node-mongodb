<!--
说明一下：我理解的这块是收藏集有三部分
1，最上面的全部和编辑推荐 recommend
2. ios 前端 后台之类的 type
3. 热门 最新 排序 sort
4.上面是区分为几个部分之后，这个页面也是需要下拉加载更多的
-->
<template>
    <div class="main">
        <myCommon v-bind:message="commonmsg"></myCommon>
        <div class="collecttop">
            <div class="commonWM">
                <span :class="{action:item.icon===recommend}" v-for="(item,index) in lanMenu" v-on:click="recommendMenu(index,item.icon)" :key="index">{{item.con}}</span>
            </div>
        </div>

        <div class="collectcon">
            <div style="width:700px;float:left;background:#fff;border-bottom:1px solid rgba(204,204,204,.3)">
                <div class="collectMenu collectMenuOne">
                    <div :class="{action:item.mark===sort}" v-for="(item,index) in collectMenuone" v-on:click="sortMenu(index,item.mark)" :key="index">{{item.con}}</div>
                </div>
                <div class="collectMenu collectMenuTwo">
                    <div :class="{action:item.icon===type}" v-for="(item,index) in collectMenutwo" v-on:click="typeMenu(index,item.icon)" :key="index">{{item.con}}</div>
                </div>
                <div class="collectCon">
                    <div class="commonWM" style="margin-top:20px;">
                        <router v-bind:message="childMsg"></router>
                    </div>
                </div>

            </div>
            <div style="width:240px;float:left;margin-left:20px;">
                <div><img src="/static/home/home_right_1.png" style="width:100%;"></div>
                <div style="margin-top:20px;"><img src="/static/home/home_right_2.png" style="width:100%;"></div>
            </div>
        </div>
    </div>
</template>
<script>
import routerView from './routerView.vue'
import common from '../common.vue'
export default {
    data() {
        return {
            lanMenu: [
                { con: '编辑推荐', icon: 'recommend' },
                { con: '全部', icon: 'all'},
            ],
            collectMenuone:[
                {con:'热门',mark:'hot'},
                {con:'最新',mark:'now'},
            ],
            collectMenutwo:[
                {con:'全部',icon:'all'},
                {con:'iOS',icon:'ios'},
                {con:'Android',icon:'android'},
                {con:'前端',icon:'web'},
                {con:'产品',icon:'products'},
                {con:'设计',icon:'desgin'},
                {con:'后端',icon:'java'}
            ],
            
            parentMsg: 'android',
            //一级菜单 二级菜单 三级排序
            recommend:'recommend',
            type:'all',
            sort:'hot',
            //传给子组件的props
            childMsg:'recommend'+":"+"hot"+":"+"all",
            //公共
            commonmsg:2
        }
    },
    components: {
        "router": routerView,
        "myCommon": common
    },
    methods: {
        //一级菜单 recommend
        recommendMenu(index,con){
           this.recommend=con;
           this.changeClass(con,this.type,this.sort)
        },
        //二级菜单 排序 
        sortMenu(index,con){
            this.sort=con;
            this.changeClass(this.recommend,this.sort,con)
        },
        //三级菜单 type
        typeMenu(index,con){
           this.type=con;
           this.changeClass(this.recommend,con,this.type)
        },
        
        //根据点击一级二级菜单来选择哪块需要显示 和地址栏需要怎么变化
        changeClass(recommend,type,sort){
            this.childMsg=recommend+":"+type+":"+sort;
            this.$router.push({path:'/collect/'+recommend,query:{type:type,sort:sort}});
        }
    }
}
</script>
<style>
.collecttop {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    background: #fff;
    border-top: 1px solid rgba(204, 204, 204, .3);
}

.collecttop span {
    display: block;
    float: left;
    padding: 0px 10px;
}

.collecttop span:hover {
    cursor: pointer
}

.action {
    color: #007fff
}

.topTwo {
    floaT: left;
}

.topTwo span {
    height: 60px;
    padding: 10px;
    cursor: pointer;
}

.collectcon {
    width: 960px;
    margin:20px auto;
}
/*二级菜单*/
.collectMenu{
    padding:13px 20px;
    
}
.collectMenu div{
    floaT:left;
    font-size:14px;
    padding:0px 10px;
    border-right:1px solid rgba(204,204,204,.3);
    cursor:pointer;
}
.collectMenuOne{
    float:left;
}
.collectMenuOne .active{
    color: #007fff
}
.collectMenuTwo{
    float:right;
}
.collectMenuTwo .active{
    color: #007fff
}
/*收藏集内容*/
.collectCon{
    width:700px;
    padding:20px;
    overflow:hidden;
    border-top:1px solid rgba(204,204,204,.3)
}
</style>
