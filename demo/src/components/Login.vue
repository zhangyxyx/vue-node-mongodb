<template>
<div>
<input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">
<input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
<button type="submit" class="btn btn-default" @click="login">登录</button>
<button @click="list">列表</button>

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
          this.$http.get('/api/home/getlist').then((response)=>{
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