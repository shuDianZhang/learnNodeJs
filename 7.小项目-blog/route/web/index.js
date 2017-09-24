const express = require('express');
const common = require('../../libs/common.js');
const mysql = require('mysql');
var db = mysql.createPool({host:'localhost',
    user:'root',password:'shu136233446',database:'blogtwo'});

module.exports = function(){
    var router = express.Router();
    router.get('/get_banners',function(req,res){
        db.query('select * from banner_table',function(err,data){
            if(err){
                res.status(500).send('database err').end();
            }else{
                res.send(data);
            }
        });
    });
    return router;
}