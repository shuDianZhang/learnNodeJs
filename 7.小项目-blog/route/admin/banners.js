const express = require('express');
const common = require('../../libs/common.js');
const mysql = require('mysql');
var db = mysql.createPool({host:'localhost',
    user:'root',password:'shu136233446',database:'blogtwo'});
module.exports = function(){
    var router = express.Router();
    router.get('/',function(req,res){
        switch(req.query.act){
            case 'mod':
                db.query('select * from banner_table where id='+req.query.id,function(err,data){
                    if(err){
                        res.status(500).send('database err');
                    }else if(data.length==0){
                        res.status(404).send('data not found').end();
                    }else{
                        db.query('select * from banner_table',function(err,banners){
                            if(err){
                                console.error(err);
                                res.status(500).send('database error').end();
                            }else{
                                res.render('admin/banner.ejs',{banners:banners,mod_data:data[0]});
                            }
                        });
                    }
                });
                break;
            case 'del':
                db.query('delete from banner_table where ID='+req.query.id,function(err,data){
                    if(err){
                        res.status(500).send('database err');
                    }else{
                        res.redirect('/admin/banners');
                    }
                });
                break;
            default:
                db.query('select * from banner_table',function(err,data){
                    if(err){
                        console.error(err);
                        res.status(500).send('database error').end();
                    }else{
                        res.render('admin/banner.ejs',{banners:data,mod_data:{}});
                    }
                });
                break;
        }
    });
    router.post('/',function(req,res){

        var title = req.body.title;
        var description = req.body.description;
        var href = req.body.href;

        if(!title || !description || !href){
            res.status(400).send('arg error').end();
        }else{
            if(req.body.mod_id){
                db.query('update banner_table set title='+db.escape(req.body.title)+','+'description='+db.escape(req.body.description)+','+'href='+db.escape(req.body.href)+'where ID='+req.body.mod_id,
                    function(err,data){
                        if(err){
                            console.error(err);
                            res.status(500).send('database error').end();
                        }else{
                            res.redirect('/admin/banners');
                        }
                    });
            }else{
                db.query('insert into banner_table (title,description,href) value ('+db.escape(title)+ ','+ db.escape(description)+ ','+db.escape(href) +')',
                    function(err,data){
                        if(err){
                            console.log(err);
                            res.status(500).send('database err').end();
                        }else{
                            res.redirect('/admin/banners');
                        }
                    });
            }
        }
    });
    return router;
}
