<template>
    <div class="main">
        <myCommon v-bind:message="commonmsg"></myCommon>
        <div class="findTop">
            <ul>
                <li :class="{action:item.icon===type}" v-for="(item,index) in lanMenu" v-on:click="typeMenu(index,item.icon)" :key="index">{{item.con}}</li>
            </ul>
        </div>

        <div class="con">
            <div class="findCon">
                <div class="findConLeft" style="background:#fff">
                    <div style="height:47px;border-bottom:1px solid rgba(204,204,204,.3)">
                        <div class="findMenu findMenuOne">
                            <div :class="{action:item.mark===sort}" v-for="(item,index) in findMenuone" v-on:click="sortMenu(index,item.mark)" :key="index" >{{item.con}}</div>
                        </div>
                        <div class="findMenu findMenuTwo">
                            <div v-for="(item,index) in findMenutwo" :key="index">{{item.con}}</div>
                        </div>
                    </div>
                    <myArticle v-bind:findChildMsg="mymessage"></myArticle>

                </div>
                <div class="findConRight">
                    <div><img src="/static/home/home_right_1.png" style="width:100%;"></div>
                    <div style="margin-top:20px;"><img src="/static/home/home_right_2.png" style="width:100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common.vue'
import article from './article.vue'
export default {
    data() {
        return {
            lanMenu: [
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
            findMenuone:[
                {con:'热门',mark:'hot'},
                {con:'最新',mark:'now'},
            ],
            findMenutwo:[
                {con:'本周最热',icon:'weekHot'},
                {con:'本月最热',icon:'monthHot'},
                {con:'历史最热',icon:'historyHot'},
            ],
            ind: 0,
            parentMsg: 'android',
            commonmsg: 3,
            //一级菜单 type 二级菜单 sort
            type:this.$route.params.id,
            sort:this.$route.query.sort===undefined?'hot':this.$route.query.sort,
            mymessage:this.$route.params.id+":"+this.$route.query.sort
  
        }
    },
    components: {
        "myCommon": common,
        'myArticle':article
    },
    
    methods: {
        //点击一级菜单
        typeMenu(index,con){
           this.type=con;
           this.changeClass(con,this.sort)
        },
        //点击二级菜单
        sortMenu(index,con){
            this.sort=con;
            console.log(con)
            this.changeClass(this.type,con)
        },
        //根据点击一级二级菜单来选择哪块需要显示 和地址栏需要怎么变化
        changeClass(type,sort){
            this.mymessage=type+":"+sort;
            this.$router.push({path:'/find/'+type,query:{sort:sort}});
        }
    }
}
</script>
<style>
/*顶部菜单*/

.findTop {
    height: 50px;
    font-size: 14px;
    background: #fff;
    border-top: 1px solid rgba(204, 204, 204, .3);
}

.findTop ul {
    width: 960px;
    height: 50px;
    margin: 0 auto;
    line-height:50px;
}

.findTop li {
    margin:0px 10px;
    display: block;
    float: left;
    color: #909090;
    cursor: pointer;
}

.findTop li:hover {
    cursor: pointer
}

.findTop .action {
    color: #007fff
}
/*菜单*/
/*发现的内容*/
.findCon{
    width:960px;
    margin:20px auto;
}
.findConLeft{
    width:700px;
    float:left;
}
.findConRight{
    width:240px;
    float:left;
    margin-left:20px;
}
.findMenuOne{
    float:left;
    padding:13px 0px 13px 10px;
}
.findMenuTwo{
    float:right;
    padding:13px 20px 0px 0px;
}
.findMenu div{
    floaT:left;
    font-size:14px;
    padding:0px 10px;
    cursor:pointer;
    border-right:1px solid rgba(204,204,204,.3)
}
</style>
