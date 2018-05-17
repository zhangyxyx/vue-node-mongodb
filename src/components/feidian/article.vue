<template>
<div style="padding:0px 20px">
    <div class="title">
        <h6>user</h6>
        <div>
            介绍 ● 时间
        </div>
    </div>
    <div class="con" style="text-align:justify ">
        Orculus 的 CTO John Carmack 回忆了他在 id Software 和开发 Doom 等游戏时和 Steve Jobs 共事的各种故事。除了表达了 Steve 是一个十足的 Asshole 为了自己的目标很少考虑别人感受，他也表达了对 Steve 极致人格的一种认可。

        I corroborate many of the negative character traits that he was infamous for, but elements of the path that led to where I am today were contingent on the dents he left in the universe.
        我承认他那些臭名昭著的坏个性，但也是他的对这个世界的贡献让我有了今天的成就。

        对人最大的赞许不是一味的颂扬，而是了解了他所有的斑斑劣迹之后依然因为他可贵的精神而无法认可对方。
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            mark:'',
        }
    },
    props:['message'],
    watch:{
        'message':function(val){
            console.log(val)
            this.mark=val;
        }
    },
    mounted(){
        this.list();
    },
    methods:{
        list:function(){
            var params={
                collections:"home",
                limit:5,
                one:"all",
                page:0,
                two:"like",
            }
            this.$http.post('/api/list/showlist',params).then((response) => {
                Vue.http.interceptors.push((response, next) => {
                    $(".tip").css("display","block")
                    next((response) => { 
                        $(".tip").css("display","none")  
                        return response;
                    })
                })
                //列表数据
                var result = response.body
                //列表数据
                //var result=JSON.parse(response.bodyText).data;
                if (response) {
                    //数据的总数量
                    var sum = JSON.parse(response.bodyText).sum;
                    //渲染出页码
                    $(".fenye .page").empty();
                    for (var i = 0; i < Math.ceil(sum / params.limit); i++) {
                        _this.sumpage.push(i);
                    }
                    //将结果赋值给需要循环
                    for (var i = 0; i < result.length; i++) {
                        _this.homelists.push(result[i])
                    }
                    return _this.homelists;
                } else {
                    alert('数据已经加载完成！')
                }
            }).then(function() {
                this.flag = true
            }).catch((response) => {
            });
        }
    }
}
</script>

<style>
.title{
    font-size:15px;margin:10px 0px;color:#8a9aa9
}
.title h6{
    font-size:15px;margin:5px 0px;
}
.con{
    font-size:15px;color:#17181a
}
</style>
