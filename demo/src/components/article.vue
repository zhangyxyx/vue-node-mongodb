<template>
<div class="row">
    <div class="col-sm-12  home-con-right" v-for="(item,index) in homelists">
            <div class="row" style="padding:10px 0px">
                <div class="col-sm-12"><h2>{{item.title}}</h2></div>
                <div class="col-sm-3"><span style="height:30px;display:block;line-height:30px;">分类：{{item.sort}}</span></div>
                <div class="col-sm-3"><span style="height:30px;display:block;line-height:30px;">时间：{{item.time}}</span></div>
                <div class="col-sm-12"><span>内容：{{item.con}}</span></div>
            </div>
            
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            homelists:[] 
        }
       
    },
    mounted:function () {
        //类似于jquery中的ready方法
        this.sums();
    },
    methods:{
        sums(){
			var _this=this;
			this.$http.get('/api/list/showlist').then((response)=>{
				//这是一个将数组字符串转化为数组json形式的过程
				var string=response.bodyText.substring(1,response.bodyText.length-1);
				var string2=string.replace(/},/g,"};");
				var array=[];
				array.push(string2.split(';'))			
				var array2=[];
				for(var i=0;i<array[0].length;i++){
					array2.push(JSON.parse(array[0][i]))
				}
				//将结果赋值给需要循环
				_this.homelists=array2;
				return _this.homelists;
			})
		}
    }
}
</script>