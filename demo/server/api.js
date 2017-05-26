"use strict";
const models=require('./db');
const express=require('express');
const router=express.Router();
//创建 读取 更新 删除
//创建账号接口
router.post('/api/login/createAccout',(req,res)=>{
	//这里是req res能够使用就在index。js中引入了const bodyParser=require('body-parser')
	let newAccount=new models.Login({
		account:req.body.account,
		password:req.body.password
	});
	//保存数据newAccount数据进入mongoDB
	newAccount.save((err,data)=>{
		if(err){
			res.send(err)
		}else{
			res.send('createAccount successed')
		}
	});
});
//获取已经有的账号接口
router.get('/api/login/getAccount',(req,res)=>{
	//通过模型去查找数据库
	models.Login.find((err,data)=>{
		if(err){
			res.send(err)
		}else{
			res.send(data)
		}
	});
});
module.exports=router;












