const models = require('./db');
const express = require('express');
const ObjectID=require('mongodb').ObjectID;
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
    var id=req.body.id||'',//对应正确的id获取数据new RegExp("^.*"+ObjectID(paramsval.id)+".*$")
    paramsval={
        val:val,
        id:id,
    };
    var sum;
    if(paramsval.id){
        var query=models.list.find({"_id":ObjectID(paramsval.id)});
        models.list.find({"_id":ObjectID(paramsval.id)}).count(function(err,data){
            sum=data;
        });
    }else if(paramsval.val){
        var query=models.list.find({"title":new RegExp("^.*"+paramsval.val+".*$")});
        models.list.find({"title":new RegExp("^.*"+paramsval.val+".*$")}).count(function(err,data){
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
//文件上传
router.post('/api/file/addfile',(req,res)=>{
    let newAccount=new models.file({
        url:req.body.img
    });
    newAccount.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send('成功上传文件')
        }
    })
})
//显示图片
router.get('/api/file/showfile',(req,res)=>{
    models.file.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
});
//专栏部分
//android
router.get('/api/android/showdata',(req,res)=>{
    models.android.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/api/web/showdata',(req,res)=>{
    models.web.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/api/ios/showdata',(req,res)=>{
    models.ios.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/api/java/showdata',(req,res)=>{
    models.java.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/api/desgin/showdata',(req,res)=>{
    models.desgin.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/api/products/showdata',(req,res)=>{
    models.products.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/api/tool/showdata',(req,res)=>{
    models.tool.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
router.get('/api/read/showdata',(req,res)=>{
    models.read.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
module.exports = router;