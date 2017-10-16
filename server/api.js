const models = require('./db');
const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const util = require("util");
// 引入处理路径的模块
const path = require('path');
const fs = require('fs');
var multer  = require('multer');
var upload=multer({dest:'upload/'});
/*
首页
专栏 专栏又分为几个部分，创建表的时候我们用的是一个zhuanlan表，然后里面有个字段表示这个数据属于哪个部分
收藏集
发现
*/

//获取列表 也就是首页中的信息 排序的话用sort 1升序 -1降序
router.post('/api/list/showlist', (req, res) => {
    //参数
    var sort = req.body.one;
    //排序参数
    var panduan = req.body.two;
    //限制几个
    var limit = req.body.limit;
    //从第几页开始
    var skip = req.body.page * limit;
    var json = {};
    json[panduan] = 1;

    var query = models.home.find({ sort: sort }).sort(json).limit(limit).skip(skip);
    query.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
//添加列表
router.post('/api/list/addlist', (req, res) => {
    var year=new Date().getFullYear();
    var month=new Date().getMonth()+1;
    var day=new Date().getDay();
    var hour=new Date().getHours();
    var minutes=new Date().getMinutes();
    var seconds=new Date().Seconds();
    var time=year+"/"+month+"/"+day+"/"+hour+"/"+minutes+"/"+seconds;
    let newAccount = new models.home({
        title: req.body.title,
        time: time,
        sort: req.body.sort,
        user: req.body.user,
        con: req.body.con,
        file:req.body.file,
    });
    newAccount.save((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send('成功添加列表')
        }
    })
});
//文件上传
router.post('/api/files/upload', upload.single('fabricImage'), function (req, res, next) {
    var file = req.file;
    //以下代码得到文件后缀
    name = file.originalname;
    nameArray = name.split('');
    var nameMime = [];
    l = nameArray.pop();
    nameMime.unshift(l);
    while (nameArray.length != 0 && l != '.') {
        l = nameArray.pop();
        nameMime.unshift(l);
    }
    //Mime是文件的后缀
    Mime = nameMime.join('');
    //重命名文件 加上文件后缀
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.filename + Mime);
    fs.renameSync('./upload/' + file.filename, '../static/upload/' + file.filename + Mime);
    var path='/static/upload/' + file.filename + Mime
    res.send(path);
})
//删除列表内容
router.post('/api/list/removelist', (req, res) => {
    var removelist = new models.list({
        _id: req.body._id
    })
    removelist.remove((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send('删除成功')
        }
    })

})
//获取详情信息
router.post("/api/list/detail", (req, res) => {
    let id = req.body.id;
    models.home.find({ "_id": ObjectID(id) }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.json(data)
        }
    })
})
//获取专栏信息
router.post('/api/zhuanlan/list', (req, res) => {
    let type=req.body.one;
    let sort=req.body.two;
    let json={};
    json[sort]=-1;
    if(type!='all'){
        models.zhuanlan.find({type:type}).sort(json).exec((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        }) 
    }else{
        models.zhuanlan.find().sort(json).exec((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        }) 
    }
});
router.post('/api/zhuanlan/add',(req,res)=>{
    //title user time con like collect type
    let title=req.body.title;
    let user=req.body.user;
    let year=new Date().getFullYear();
    let month=new Date().getMonth()+1;
    let day=new Date().getDate();
    let hour=new Date().getHours();
    let minutes=new Date().getMinutes();
    let seconds=new Date().getSeconds();
    let time=year+"/"+month+"/"+day+"/"+hour+"/"+minutes+"/"+seconds;
    let con=req.body.con;
    let like=req.body.like;
    let collect=req.body.collect;
    let type=req.body.type;
    let newAccount = new models.zhuanlan({
        title:title,
        user:user,
        time:time,
        con:con,
        like:like,
        collect:collect,
        type:type,
    });
    newAccount.save((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send('成功添加列表')
        }
    })
})
//获取收藏集信息
router.post('/api/collect/list', (req, res) => {
    let recommend=req.body.recommend;
    let type=req.body.type==='all'?'':req.body.type;
    let sort=req.body.sort;
    let json={};
    json[sort]=-1;
    models.collect.find({recommend:recommend,type:type}).sort(json).exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
});
//获取发现信息
router.post('/api/find/list', (req, res) => {
    console.log(req.body)
    let type=req.body.type;
    let sort=req.body.sort;
    let json={};
    json[sort]=-1;
    if(type!='all'){
        models.collect.find({type:type}).sort(json).exec((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        })
    }else{
        models.collect.find().sort(json).exec((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        })
    }
    
});
//后台
//后台登录
router.post('/api/login/add', (req, res) => {
    let name = req.body.name;
    let pass = req.body.pass;
    models.login.find({ name: name, pass: pass }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            if (data[0] == undefined) {
                res.send('fail')
            } else {
                res.send('success')
            }
        }
    })
})
//查询数据
router.get('/api/seek/list', (req, res) => {
    var offset = parseInt(req.query.offset);//页码
    var limit = parseInt(req.query.limit);//限制显示几个 
    models.seek.find().skip(offset).limit(limit).find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            models.seek.find().count((err, result) => {
                res.send({
                    body: {
                        rows: data,
                        size: limit,
                        total: result
                    }
                })
            })
        }
    });
})
//添加数据
router.post('/api/seek/add', (req, res) => {
    let newDate = new models.seek({
        title: req.body.title,
        user: req.body.name,
        time: req.body.time,
        sort: req.body.sort,
        con: req.body.con,
    })
    newDate.save((err, date) => {
        if (err) {
            res.send(err)
        } else {
            res.send('添加成功')
        }
    })
})
//删除数据
router.post('/api/seek/remove', (req, res) => {
    models.seek.remove({ _id: { $in: req.body.id } }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
})
module.exports = router;