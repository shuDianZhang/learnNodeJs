const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');
var server = express();

var objMulter = multer({dest:'./www/upload'});          //指定上传文件的位置，默认情况是放在内存里，为了防止内存资源的浪费，需要指定放置位置
server.use(objMulter.any());

server.post('/',function(req,res){
    //           req.files[0].path ->  www\\upload\\dfkdhdhgk545d4dgdg4d5
   var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;

     fs.rename(req.files[0].path,newName,function(err){
        if(err){
            res.send('上传失败！');
        }else{
            res.send('上传成功！');
        }
    });
});
server.listen(8088);
