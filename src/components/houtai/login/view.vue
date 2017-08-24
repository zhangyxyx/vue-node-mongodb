<template>
<div class="commonWM" style="border:1px solid #ccc;background:#fff;padding:20px;">
    <h3 style="text-align:center;">登录管理员页面</h3>
    <div style="width:500px;margin:0 auto">
        <form>
            <div class="form-group">
                <label>用户名：(admin)</label><input type="text" class="form-control" placeholder="请输入用户名" v-bind:name="name">
            </div>
            <div class="form-group">
                <label>密码：(123456)</label>
                <input type="password" class="form-control" placeholder="请输入密码"  v-bind:name="pass">
            </div>
            <div class="tip" style="color:red;margin:10px 0px"></div> 
            <button type="button" class="btn btn-primary" v-on:click="login()">开始登录</button>
        </form>
    </div>
</div>  
</template>

<script>
export default {
    data(){
        return{
            name:'user',
            pass:'pass'
        }
    },
    methods:{
        login(){
            var name=$("input[name=user]").val();
            var pass=$("input[name=pass]").val();
            var params={
                name:name,
                pass:pass,
            }
            this.$http.post('/api/login/add',params).then((response)=>{
                if(response&&response.body=='success'){
                   window.location.href=window.location.origin+"/#/houtai/home"
                }else{
                    $(".tip").html('用户名或密码错误')
                }
            })
        },
    }
}
</script>

<style>

</style>
