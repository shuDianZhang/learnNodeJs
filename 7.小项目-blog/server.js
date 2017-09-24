const express = require('express');
const static  = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerObj = multer({dest:'./static/upload'});
const cookieParser = require('cookie-parser');
const cookieSession= require('cookie-session');
const mysql = require('mysql');
const db = mysql.createPool({host:'localhost',
    user:'root',password:'shu136233446',database:'blogtwo'});

const consolidate = require('consolidate');

var server = express();
server.listen(8088);

server.use(cookieParser('fgsdkjfgfds'));

// -----------------   防止全局变量影响环境
(function(){var arr = [];
    for(var i=0 ; i<100000; i++){
        arr.push('keys_'+Math.random());
    }
    server.use(cookieSession({
        name:'Mint_session',
        keys:arr,
        maxAge:20*3600*1000
    }));}
)();



server.set('view engine','html');
server.set('views','./template');
server.engine('html',consolidate.ejs);

server.use(bodyParser.urlencoded({extended:false}));
server.use(multerObj.any());
server.use(static('./static/'));


server.use('/',require('./route/web/index.js')());
server.use('/admin',require('./route/admin/index.js')());

//-------------------------------------------------------------------------------------------------------------


