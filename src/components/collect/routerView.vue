<template>
<div>
    <div style="width:700px;float:left;background:#fff;border-bottom:1px solid rgba(204,204,204,.3)">
        <div class="collectMenu collectMenuOne">
            <div v-for="(item,index) in collectMenuone" :key="index">{{item.con}}</div>
        </div> 
        <div class="collectMenu collectMenuTwo">
            <div v-for="(item,index) in collectMenutwo" :key="index">{{item.con}}</div>
        </div>
        <div class="collectCon">
            <div class="collectConEvery" v-for="(item,index) in homelists" >
                <div style="position:absolute;bottom:10px;left:20px">
                    <h4>{{item.title}}</h4>
                    <div style="width:270px;">
                        <div style="width:auto;float:left;height:25px;line-height:25px;">
                            <span>{{item.user}}&nbsp;•&nbsp;</span>
                            <span>{{item.article}}篇文章&nbsp;•&nbsp;</span>
                            <span>{{item.follow}}人关注</span>
                        </div>
                        <div class="follow">关注</div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    <div style="width:240px;float:left;margin-left:20px;">
        <div><img src="/static/home/home_right_1.png" style="width:100%;"></div>
		<div style="margin-top:20px;"><img src="/static/home/home_right_2.png" style="width:100%;"></div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            homelists:[],
            sumpage:[],
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
            ]
        }
    },
    props:['message'],
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
           this.$http.get('/api/collect/list').then((response)=>{
                 //列表数据
                var result=JSON.parse(response.bodyText);
				//将结果赋值给需要循环
                console.log(result)
				_this.homelists=result; 
				return _this.homelists;
           }) 
        }
    }

}
</script>

<style>
.collectMenu{
    padding:13px 20px;
    
}
.collectMenu div{
    floaT:left;
    font-size:14px;
    padding:0px 10px;
    border-right:1px solid rgba(204,204,204,.3)
}
.collectMenuOne{
    float:left;
}
.collectMenuTwo{
    float:right;
}
/*收藏集内容*/
.collectCon{
    width:700px;
    padding:20px;
    overflow:hidden;
    border-top:1px solid rgba(204,204,204,.3)
}
/*收藏集中每一个*/
.collectConEvery{
width:310px;
height:160px;
position:relative;
float:left;
background:rgba(0,0,0,.2);
margin:0px 10px 20px 10px;
}
.collectConEvery .follow{
    width:58px;cursor:pointer;
    height:25px;text-align:center;
    line-height:25px;
    float:right;border:1px solid #fff
}
.collectConEvery .follow:hover{
    background:rgba(255,255,255,.3)
}
.every{
    border-bottom:1px solid #efefef;
    background:#fff;
    padding:10px;
}

.col-sm-9{
    padding:0px;
}
</style>
