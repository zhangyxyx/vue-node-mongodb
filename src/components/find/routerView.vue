<template>
<div>
   <div class="findCon">
        <div class="findConLeft" style="background:#fff">
           <div class="findMenu findMenuOne">
                <div v-for="(item,index) in findMenuone" :key="index">{{item.con}}</div>
            </div> 
            <div class="findMenu findMenuTwo">
                <div v-for="(item,index) in findMenutwo" :key="index">{{item.con}}</div>
            </div>
            <myArticle v-bind:articlemessage="mymessage"></myArticle>

        </div>
        <div class="findConRight">
            
        <div><img src="/static/home/home_right_1.png" style="width:100%;"></div>
		<div style="margin-top:20px;"><img src="/static/home/home_right_2.png" style="width:100%;"></div>

        </div>
    </div>
</div>

</template>

<script>
import article from './article.vue'
export default {
    data(){
        return{
            homelists:[],
            sumpage:[],
            mymessage:'all',
            findMenuone:[
                {con:'热门',mark:'hot'},
                {con:'最新',mark:'now'},
            ],
            findMenutwo:[
                {con:'本周最热',icon:'weekHot'},
                {con:'本月最热',icon:'monthHot'},
                {con:'历史最热',icon:'historyHot'},
            ]
        }
    },
    props:['message'],
    components:{
        'myArticle':article
    },
    mounted(){
        this.showdata();
    },
    watch:{
        'message':function(){
            this.showdata();
        }
    },
    methods:{
        showdata(){
           var _this=this;
           this.$http.get('/api/find/list').then((response)=>{
                 //列表数据
                var result=JSON.parse(response.bodyText);
				//将结果赋值给需要循环
				_this.homelists=result; 
				return _this.homelists;
           }) 
        }
    }

}
</script>

<style>
/*发现的内容*/
.findCon{
    width:960px;
    margin:0 auto;
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
    padding:13px 0px;
    border-bottom:1px solid rgba(204,204,204,.3)
}
.findMenuTwo{
    float:right;
    padding:13px 0px;
    border-bottom:1px solid rgba(204,204,204,.3)
}
.findMenu div{
    floaT:left;
    font-size:14px;
    padding:0px 10px;
    border-right:1px solid rgba(204,204,204,.3)
}
</style>
