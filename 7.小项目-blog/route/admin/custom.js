const express = require('express');
const common = require('../../libs/common.js');
const mysql = require('mysql');
var db = mysql.createPool({host:'localhost',
    user:'root',password:'shu136233446',database:'blogtwo'});
const pathLib = require('path');
const fs = require('fs');

module.exports = function(){
    var router = express.Router();
    router.get('/',function(req,res){

        switch(req.query.act){
            case 'del' :
                db.query('select * from custom_evaluation_table where ID='+req.query.id,function(err,data){
                    if(err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    }else{
                        if(data.length == 0){
                           res.status(404).send('no this custom evalution').end();
                        }else{
                            fs.unlink('./static/upload/'+data[0].src,function(err){      // fs中专门用来删除文件的
                                if(err){
                                    console.log(err);
                                    res.status(500).send('file operation error').end();
                                }else{
                                    db.query('delete from custom_evaluation_table where ID='+req.query.id,function(err,data){
                                        if(err){
                                            console.error(err);
                                            res.status(500).send('database error').end();
                                        }else{
                                            res.redirect('/admin/custom');
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
                break;
            case 'mod':
                db.query('select * from custom_evaluation_table where ID='+req.query.id,function(err,data){
                    if(err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    }else if(data.length == 0){
                        res.status(404).send('no this evalution').end();
                    }else{
                        db.query('select * from custom_evaluation_table',function(err,evaluations){
                            if(err){
                                console.error(err);
                                res.status(500).send('database error').end();
                            }else{
                                res.render('admin/custom.ejs',{evaluations:evaluations,mod_data:data[0]});
                            }
                        });
                    }
                });
                break;
            default:
                db.query('select * from custom_evaluation_table',function(err,evaluations){
                    if(err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    }else{
                        res.render('admin/custom.ejs',{evaluations:evaluations});
                    }
                });
        }
    });


    router.post('/', function (req, res){
        var title=req.body.title;
        var description=req.body.description;

        var ext=pathLib.parse(req.files[0].originalname).ext;

        var oldPath=req.files[0].path;
        var newPath=req.files[0].path+ext;

        var newFileName=req.files[0].filename+ext;

        fs.rename(oldPath, newPath, function(err){
            if(err){
                res.status(500).send('file opration error').end();
            }else{
                if(req.body.mod_id){  //修改

        }else{                //添加
            db.query('INSERT INTO custom_evaluation_table (title, description, src)VALUES('+db.escape(title)+','+db.escape(description)+','+db.escape(newFileName)+')'
                ,function(err, data){
                if(err){
                    console.error(err);
                    res.status(500).send('database error').end();
                }else{
                    res.redirect('/admin/custom');
        }
        });
        }
    }
    });


    });
    return router;
}