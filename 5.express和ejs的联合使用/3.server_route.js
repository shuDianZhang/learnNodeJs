/*
    router -> 路由
    把不同的目录， 对应到不同的模块
    xxxx.com/aaa/     mod1
    xxxx.com/news/    mod_news
         post              news_post
         list              news_list
         content           news_content
    xxxx.com/user/    mod_users

    Router  --  相当于一个mini版的server，相当于一个子服务
 */

const express = require('express');
var server = express();

//目录1： /user/
var routerUser = express.Router();
server.use('/user',routerUser);

routerUser.get('/1.html',function(req,res){
    res.send('user1');
});
routerUser.get('/2.html',function(req,res){
   res.send('user222');
});



//目录2： /article/
var articleRouter = express.Router();
server.use('/article',articleRouter);

articleRouter.get('/a.html',function(req,res){
    res.send('This is a.html content');
});
articleRouter.get('/b.html',function(req,res){
    res.send('This is b.html content');
});

server.listen(8088);