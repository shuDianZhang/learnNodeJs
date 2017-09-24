const express = require('express');
const getPostMsg = require('./LIB/getPostMsg');
var server = express();
server.listen(8089);
/*
server.use(function(req,res,next){
    var str = '';
    req.on('data',function(data){
        str+=data;
    });
    req.on('end',function(){
        req.body = querystring.parse(str);
        next();
    });
});
*/
server.use(getPostMsg());
server.use('/',function(req,res){
    console.log(req.body);
});



