/*
     session -存在服务器
          不能独立存在，基于cookie
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

var server = express();

server.use(cookieParser());              //解析签名的cookie
server.use(cookieSession({
    name:'sess',
    keys:['aaa','bbb','bbb'],             //防止密钥劫持          session是json类型
    maxAge:2*60*60*1000
}));

server.use('/',function(req,res){
    if(req.session['count']==null){
        req.session['count']=1;
    }else{
        req.session['count']++;
    }
    console.log(req.session['count']);
    // delete res.session;                  //删除cookie
    res.send('ok');
});
server.listen(8088);


