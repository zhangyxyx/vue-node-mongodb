<template>
<div class="HTlogin">
    <h3>登录管理员页面</h3>
    <div class="user">
        <label>用户名：(admin)</label><input type="text" class="form-control" placeholder="请输入用户名" v-bind:name="name">
    </div>
    <div class="pass">
        <label>密码：(123456)</label><input type="password" class="form-control" placeholder="请输入密码"  v-bind:name="pass">
    </div>
    <div class="update">
        <div class="tip" style="color:red;margin:10px 0px"></div> 
        <button type="button" class="btn btn-primary" v-on:click="login()">开始登录</button>
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

<style lang="scss">
@import '../../../style/mixin';
.HTlogin{
    @include wh(400px,400px);
    border:1px solid #ccc;
    background:#fff;
    padding:20px;
    margin:20px auto;
    h3{
        text-align:center;
        padding:20px;
    }
    .user{
        padding:10px;
        input{
            border:1px solid #ccc;
            background:#fff;
        }
    }
    .pass{
        padding:10px;
        input{
            border:1px solid #ccc;
            background:#fff;
        }
    }
    .update{
        text-align:center;
        button{
            @include wh(100px,40px);
            background:#007fff;
            text-align:center;
            color:#fff;
        }
    }
}

</style>
