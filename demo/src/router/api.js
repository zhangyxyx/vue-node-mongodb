module.exports=function(app){
	app.use(function(req,res,next){
		res.setHeader('Access-Control-Allow-Origin','http://192.168.0.101:8080');
		res.setHeader('Access-Control-Allow-Headers','content-type');
		res.setHeader('Access-Control-Allow-Credentials','true');
		next();
	})
	app.options('*',function(req,res,next){
		res.send();
	})
	require('./register')(app);
	require('./login')(app);
	require('./bookslist')(app);
	require('./cart')(app);
	require('./logout')(app)

};