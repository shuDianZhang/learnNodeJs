const express = require('express');
const common = require('../../libs/common.js');
const mysql = require('mysql');
var db = mysql.createPool({host:'localhost',
    user:'root',password:'shu136233446',database:'blogtwo'});

module.exports = function(){
    var Router = express.Router();

    //检查登录状态
    Router.use(function (req, res, next) {
        if (!req.session['admin_id'] && req.url != '/login') {          //没有登录
            res.redirect('/admin/login');
        } else {
            next();
        }
    });
    Router.get('/login',function(req,res){
        res.render('admin/login.ejs', {});
    });
    Router.post('/login', function (req, res) {
        var username =req.body.username;
        var password =common.md5(req.body.password+common.MD5_SUFFIX);
        db.query('select * from admin_table where username='+db.escape(username),function(err,data){
            if(err){
                console.log(username);
                console.log(err);
                res.status(500).send('database error').end();
            }else{
                if(data.length==0){
                    res.status(400).send('no this admin').end();
                }else{
                    if(data[0].password == password){
                        req.session['admin_id'] = data[0].ID;
                        res.redirect('/admin/');
                    }else{
                        res.status(400).send('this password is error');
                    }
                }
            }
        });
    });

    Router.get('/',function(req,res){
        res.render('admin/index.ejs',{})
    });
    Router.use('/banners',require('./banners.js')());
    Router.use('/custom',require('./custom.js')());
    return Router;
}
