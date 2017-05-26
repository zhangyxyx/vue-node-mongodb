//schema model entity或者documents的关系请牢记，schema生成model model创造entity model和entity都可对数据库操作造成影响，但是model比entity更具有操作性
const mongoose=require('mongoose');
//链接数据库 如果不是自己创建 默认test数据库自动生成
mongoose.connect('mongodb://localhost/test');

//为这侧链接绑定事件
const db=mongoose.connection;
db.once('error',()=>console.log('mongo connection error'));
db.once('open',()=>console.log('mongo connection successed'));

//定义模块
const loginSchema=mongoose.Schema({
	account:String,
	password:String
});

//定义模型
const Models={
	Login:mongoose.model('Login',loginSchema)
}

module.exports=Models;