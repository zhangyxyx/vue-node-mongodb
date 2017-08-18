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

/************** 定义模型Model **************/


/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
    account : String,
    password : String
});
const homesSchema=mongoose.Schema({
	id:String
});
//列表的模式
const listSchema=mongoose.Schema({
	title:String,
    time:String,
    sort:String,
    con:String,
    user:String
});
//文件
const fileSchema=mongoose.Schema({
    url:String
});


//后台测试接口
const seeks=mongoose.Schema({
    title:String,
    user:String,
    time:String,
    sort:String,
    con:String,
})
const Models = {
    Login : mongoose.model('Login',loginSchema),
    homes: mongoose.model('homes',homesSchema),
    list:mongoose.model('list',listSchema),
    file:mongoose.model('file',fileSchema),

    android:mongoose.model('android',zlandroid),
    web:mongoose.model('web',zlweb),
    ios:mongoose.model('ios',zlios),
    java:mongoose.model('java',zljava),
    desgin:mongoose.model('desgin',zldesgin),
    products:mongoose.model('products',zlproducts),
    tool:mongoose.model('tool',zltool),
    read:mongoose.model('read',zlread),

    //后台测试接口
    seek:mongoose.model('seeks',seeks),

}
module.exports = Models;