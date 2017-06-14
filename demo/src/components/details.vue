<template>
<div class="row">
    <!--标题-->
    <div class="col-sm-12">
        <h2>asasas</h2>
    </div>
    <!--分类和时间-->
    <div class="col-sm-3">
        <span></span>
        <span></span>
    </div>
    <!--具体内容-->
    <div class="col-sm-12">
        <p></p>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return{
            
        }
    },
    beforeCreate:function(){
      alert(this.$store.state.dataId)
   },
    methods:{
        showlist(){
            // this.$http.post('/api/list/showlist',params).then((response)=>{
            //     //列表数据
            //     var result=JSON.parse(response.bodyText).data;
            //     //数据的总数量
            //     var sum=JSON.parse(response.bodyText).sum;
            //     //渲染出页码
            //     $(".fenye").empty();
                
            //     for(var i=0;i<Math.ceil(sum/params.limit);i++){
            //         _this.sumpage.push(i);
            //     }
            //     console.log( _this.sumpage)
			// 	//将结果赋值给需要循环
			// 	_this.homelists=result;
			// 	return _this.homelists;
			// });
        },
    }
}
</script>
