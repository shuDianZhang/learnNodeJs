const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');                    //专门解析post数据
const multer = require('multer');                             //专门解析post上传的文件
const mysql = require('mysql');
const db = mysql.createPool({host:'localhost',
    user:'root',password:'shu136233446',database:'blog'});          //建立连接池
var objMulter = multer({dest:'./www/upload'});
const consolidate = require('consolidate');
const common = require('./libs/common');

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
server.set('views','./template');
//       那种模板引擎
server.engine('html',consolidate.ejs);

server.use(static('./www'));                               //4.static参数


//------------------------------------------------------------------------------------------------------------------------------
server.get('/',function(err,res,next){
    //查询banner            ->    数据库中，每一行数据都是一个json，一个对象
    db.query('select *from banner_table',function(err,data){
        if(err){
            res.status(500).send('database error').end();
        }else{
            res.banners = data;
            next();
        }
    });
});


server.get('/',function(req,res,next){
    db.query('select ID,title,summary from article_table',function(err,data){
        if(err){
            res.status(500).send('database error').end();
        }else{
            res.article = data;
            next();
        }
    });
});



server.get('/',function(req,res){
    res.render('index.ejs',{banners:res.banners,article:res.article});
});


server.get('/article',function(req,res){
    if(req.query.id){
        if(req.query.act=='like'){
            db.query('update article_table set n_like=n_like+1 where ID='+req.query.id, function(err,data){
                 if(err){
                     res.status(500).send('点赞失败！');
                 }else{
                     db.query('select * from article_table where ID='+req.query.id,function(err,data){
                         if(err){
                             res.status(500).send('数据有问题').end();
                         }else{
                             if(data.length==0){
                                 res.status(404).send('您请求的文章找不到').end();
                             }else{
                                 var articleData = data[0];
                                 articleData.sDate = common.time2date(articleData.post_time);
                                 articleData.content = articleData.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
                                 res.render('conText.ejs',{article_data:articleData});
                             }
                         }
                     });
                 }
            });
        }else{
            db.query('select * from article_table where ID='+req.query.id,function(err,data){
                if(err){
                    res.status(500).send('数据有问题').end();
                }else{
                    if(data.length==0){
                        res.status(404).send('您请求的文章找不到').end();
                    }else{
                        var articleData = data[0];
                        articleData.sDate = common.time2date(articleData.post_time);
                        articleData.content = articleData.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
                        res.render('conText.ejs',{article_data:articleData});
                    }
                }
            });
        }
    }else{
       res.status(404).send('您请求的文章找不到').end();
    }
});



