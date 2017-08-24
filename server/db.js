// Schema、Model、Entity或者Documents的关系请牢记，
//Schema生成Model，Model创造Entity，
//Model和Entity都可对数据库操作造成影响，
//但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));


/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
    account : String,
    password : String
});
const homesSchema=mongoose.Schema({
	title:String,
    time:String,
    sort:String,
    con:String,
    user:String
});
//列表的模式
const listSchema=mongoose.Schema({
	title:String,
    time:String,
    sort:String,
    con:String,
    user:String,
    like:Number,
    collect:Number
});
//文件
const fileSchema=mongoose.Schema({
    filename: String,
});
//专栏
const zlSchema=mongoose.Schema({
    user:String,
    title:String,
    con:String,
    like:Number,
    collect:Number,
    time:String,
});
//收藏集
const clSchema=mongoose.Schema({
    user:String,
    title:String,
    con:String,
    time:String,
});
//发现
const fiSchema=mongoose.Schema({
    user:String,
    title:String,
    con:String,
    time:String,
});
//后台测试接口
const seeks=mongoose.Schema({
    title:String,
    user:String,
    time:String,
    sort:String,
    con:String,
});
//后台登录
const login=mongoose.Schema({
    name:String,
    pass:String
})
/************** 定义模型Model **************/
const Models = {
    Login : mongoose.model('Login',loginSchema),
    home: mongoose.model('home',homesSchema,'home'),//首页
    zhuanlan:mongoose.model('zhuanlan',zlSchema,'zhuanlan'),//专栏
    collect:mongoose.model('collect',clSchema,'collect'),//收藏
    find:mongoose.model('find',fiSchema,'find'),//发现
    //后台测试接口
    seek:mongoose.model('seeks',seeks),
    file:mongoose.model('file',fileSchema),
    login:mongoose.model('login',login,'login')
}
module.exports = Models;