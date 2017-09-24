/*
    http-无状态的
    cookie session

    cookie  : 在浏览器保存一些数据，每次请求服务器都会带过来
        *不安全 用户可以修改   大小有限(4kb)
    session : 保存数据，保存在服务端
        *安全，无限

    session: 基于cookie实现的
        *cookie会有一个session的ID,服务器利用sessionID找到session文件，读取，写入

        隐患：session劫持
*/
const express = require('express');
const cookieParser = require('cookie-parser');
var server = express();

server.use(cookieParser());                                             //中间件

server.use('/',function(req,res){
    res.cookie('user9999','shujian',{path:'/aaa',maxAge: 30*24*60*1000});      //给浏览器发送cookie(种cookie)  只有在路径 /aaa 的情况下才可以发送和接收cookie
    console.log(req.cookies);                                                  //接收浏览器的cookie
    res.send('ok');
});
server.listen(8088);

