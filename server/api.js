const models = require('./db');
const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const util = require("util");
// 引入处理路径的模块
const path = require('path');
const fs = require('fs');



//获取列表 也就是首页中的信息 排序的话用sort 1升序 -1降序
router.post('/api/list/showlist', (req, res) => {
    //参数
    var sort = req.body.one;
    //排序参数
    var hot = req.body.two;
    var query = models.list.find({ sort: sort });
    query.find(function (err, data) {
        if (err) {
            res.send(err)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})
//添加列表
router.post('/api/list/addlist', (req, res) => {
    let newAccount = new models.list({
        title: req.body.title,
        time: req.body.time,
        sort: req.body.sort,
        user: req.body.user,
        con: req.body.con
    });
    newAccount.save((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send('成功添加列表')
        }
    })
});
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
//文件上传
// router.post('/api/file/addfile',(req,res)=>{
//     let newAccount=new models.file({
//         url:req.body.img
//     });
//     newAccount.save((err,data)=>{
//         if(err){
//             res.send(err)
//         }else{
//             res.send('成功上传文件')
//         }
//     })
// })
//读取文件



router.post('/api/file/upload', function (req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    if (req.busboy) {
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var saveTo = path.join(__dirname.replace('routes', 'static'), '文件');
            file.pipe(fs.createWriteStream(saveTo));
            file.on('end', function () {
                //在这边可以做一些数据库操作  
                res.json({
                    success: true
                });
            });
            console.log(file)
        });
        req.pipe(req.busboy);
    }
    //这是图片成base64的时候后台接收的
    // form.parse(req, function(err, fields, files){
    //     console.log(files)
    //     var inputFile = files.file[0];
    //     var uploadedPath = inputFile.path;
    //     var dstPath = './uploads/' + inputFile.originalFilename;
    //     fs.rename(uploadedPath, dstPath, function(err) {
    //         if(err){
    //             console.log('rename error: ' + err);
    //         } else {
    //             console.log('rename ok');
    //         }
    //     });
    //     files.file.path = dstPath;
    //     var data = files;

    //     res.send(data);
    // });
});
//显示图片
router.get('/api/file/showfile', (req, res) => {
    models.file.find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
});
//获取专栏信息
router.get('/api/zhuanlan/list', (req, res) => {
    models.zhuanlan.find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
});
//获取收藏集信息
router.get('/api/collect/list', (req, res) => {
    models.collect.find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
});
//获取发现信息
router.get('/api/find/list', (req, res) => {
    models.find.find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
//后台
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