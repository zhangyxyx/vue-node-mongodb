const models = require('./db');
const express = require('express');
const router = express.Router();
// 创建账号接口
router.post('/api/login/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account : req.body.account,
        password : req.body.password
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});
// 获取已有账号接口
router.get('/api/login/getAccount',(req,res) => {
    // 通过模型去查找数据库
    models.Login.find((err,data) => {
        if (err) {
            res.send(err);
        } else {

            res.send(data);
        }
    });
});

//获取列表
router.post('/api/list/showlist',(req,res)=>{
    //初始化
    var page=req.body.page;//页码
    var limit=req.body.limit;//限制显示几个 
    var s=page*limit;//从第几个开始
    var val=req.body.title||'';//搜索关键字  
    var sum;
    if(val){
        var query=models.list.find({"title":new RegExp("^.*"+val+".*$")});
        models.list.find({"title":new RegExp("^.*"+val+".*$")}).count(function(err,data){
            sum=data;
        });
    }else{
        var query=models.list.find();
        models.list.find().count(function(err,data){
           sum=data;
        })
    }

    query.skip(s).limit(limit).find(function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send({
                data:data,
                sum:sum
            })
        }
    })
   
});
//添加列表
router.post('/api/list/addlist',(req,res)=>{
   let newAccount=new models.list({
       title:req.body.title,
       time:req.body.time,
       sort:req.body.sort,
       con:req.body.con
   });
   newAccount.save((err,data)=>{
       if(err){
           res.send(err)
       }else{
           res.send('成功添加列表')
       }
   })
});
//删除列表内容
router.post('/api/list/removelist',(req,res)=>{
    var removelist=new models.list({
        _id:req.body._id
    })
    removelist.remove((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send('删除成功')
        }
    })
    
})

module.exports = router;