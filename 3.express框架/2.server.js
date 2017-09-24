const express = require('express');
const expressStatic = require('express-static');
var server = express();
server.listen(8089);

//用户数据
var users={
    'stream':'123456',
    'Mint':'123456',
    'WeiCo':'123456'
};


server.use(expressStatic('./www'));             //中间件
//req.query   容纳的是get数据
server.get('/login',function(req,res){
//     console.log(req.query);     {'a':'12','b':'15'}     req.query 获取get数据是express框架自带的，不是来自expressStatic
    var user = req.query['user'];
    var pass = req.query['pass'];
    if(users[user]==null){
        res.send({'ok':false,'msg':'用户名不存在!'});
    }else if(users[user]!=pass){
        res.send({'ok':false,'msg':'密码错误'});
    }else{
        res.send({'ok':true,'msg':'登录成功!'});
    }
});




