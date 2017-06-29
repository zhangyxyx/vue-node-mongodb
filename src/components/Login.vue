<template>
<div class="container">
  <div class="col-sm-8">
  <div class="row" style="margin-top:30px">
      <div class="col-sm-2" style="text-align:right"> 账号：</div><div class="col-sm-10" style="marign:10px 0px"><input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account"></div>
      <div class="col-sm-2" style="text-align:right">密码：</div><div class="col-sm-10" style="margin:10px 0px"><input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password"></div>
     <div class="col-sm-12" style="text-align:center"> <button type="submit" class="btn btn-default" @click="login">登录</button></div>
  </div>
  </div>

</div>
</template>

<script>
    export default {
    data() {
        return {
            account : '',
            password : ''
        }
    },
   
    methods:{
        login() {
          // 获取已有账号密码
          this.$http.get('/api/login/getAccount').then((response) => {
              // 响应成功回调
              console.log(response)
              let params = { 
                account : this.account,
                password : this.password
              };
              // 创建一个账号密码
              return this.$http.post('/api/login/createAccount',params);
            })
            .then((response) => {
              console.log(response)
            })
            .catch((reject) => {
              console.log(reject)
            });
        },
        list(){
          this.$http.get('/api/list/list').then((response)=>{
            console.log(response);
          }).then((response)=>{
            console.log(response)
          }).catch((reject)=>{
            console.log(reject)
          })
        }
      }
    }
</script>