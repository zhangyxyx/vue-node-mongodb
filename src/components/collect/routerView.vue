<template>
<div class="row">
    <div class="col-sm-9">
        <div v-for="(item,index) in homelists" class="every">
            <h2>{{item.title}}</h2>
            <p>{{item.con}}</p>

        </div>
    </div>
    <div class="col-sm-2"></div>
</div>
</template>

<script>
export default {
    data(){
        return{
            homelists:[],
            sumpage:[],
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
           this.$http.get('/api/'+this.message+'/showdata').then((response)=>{
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
.every{
    border-bottom:1px solid #efefef;
    background:#fff;
    padding:10px;
}
</style>
