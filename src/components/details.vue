<template>
<div>
    <myCommon v-bind:message="commonmsg"></myCommon>
    <div style="width:960px;margin:20px auto;">
        <div style="width:700px;float:left;background:#fff;">
            <!--标题-->
            <div class="col-sm-12" style="margin:10px 0px;">
                <h1>{{result.title}}</h1>
            </div>
            <!--分类和时间-->
            <div class="col-sm-5" style="margin:10px 0px">
                <span style="color:#666">分类：{{result.sort}}</span>
                <span style="color:#666">时间：{{result.time}}</span>
            </div>
            <!--具体内容-->
            <div class="col-sm-12">
                <p style="text-indent:2em;font-size:20px">{{result.con}}</p>
            </div>
        </div>
        <div style="width:240px;margin-left:20px;float:left;">
            <img src="/static/home/home_right_1.png" style="width:100%"/>
        </div>
    </div>
    
</div>
</template>
<script>
import common from './common.vue'
export default{
    data(){
        return{
           result:{},
        }
    },
    components: {
		"myCommon": common
	},
    mounted:function(){
        this.showlist();
    },
    methods:{
        showlist(){
            var _this=this;
            this.$http.post('/api/list/detail',{id:this.$route.params.id}).then((response)=>{
                //数据
                if(response&&response.body[0]){
                    this.result=response.body[0]
                }
			});
        },
    }
}
</script>
