const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');                    //专门解析post数据
const multer = require('multer');                             //专门解析post上传的文件
var objMulter = multer({dest:'./www/upload'});
const consolidate = require('consolidate');

var server = express();
server.listen(8088);
server.use(cookieParser('MintMintMintMint'));                    //1.解析cookie
//2.使用session
var arr = [];
for(var i=0 ; i<100000; i++){
    arr.push('keys_'+Math.random());
}
server.use(cookieSession({
    name:'Mint_session',
    keys:arr,
    maxAge:20*3600*1000
}));
server.use(bodyParser.urlencoded({extended:false}));              //3.解析post数据  只能解析数据，不能解析文件
server.use(objMulter.any());
server.use('/',function(req,res,next){                            //用户请求
//console.log(req.query,req.body,req.cookies,req.session)这些东西都有了
    next();
});

//配置模版引擎：
//       输出什么东西
server.set('view engine','html');
//       模板文件放在哪儿
server.set('views','./views');
//       那种模板引擎
server.engine('html',consolidate.ejs);

server.get('/index',function(req,res){
    res.render('1.ejs',{name:'Mint'});
});

server.use(static('./www'));                                      //4.static参数

