<template>
<div class="commonWM" style="background:#fff;height:auto;display:inline-block;margin:0 auto">
    <!--标题-->
    <div class="col-sm-12" style="margin:10px 0px">
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
</template>
<script>
export default{
    data(){
        return{
           result:{},
        }
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
