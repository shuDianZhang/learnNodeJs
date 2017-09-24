//node的mysql模块是客户端
const mysql = require('mysql');

//1.将数据库连接到服务器
//createConnection(那台服务器，用户名，密码，操作哪个库);
var db = mysql.createConnection({host:'localhost',
    port:3306,user:'root',
    password:'shu136233446',
    database:'20170322'});

//2.查询
//query(干啥，回调函数);
db.query('select * from user_table;',function(err,data){
    if(err){
        console.log('出错了',err);
    }else{
        console.log('成功了',data);
    }
});
