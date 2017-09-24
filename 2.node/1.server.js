/*
  对文件访问：
     http://localhost:8089/1.html
     http://localhost:8089/ajax.js
     http://localhost:8089/1.jpg

  对接口访问：
     http://localhost:8089/user

 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

var users = {};

var server = http.createServer(function(req,res){
     // 解析数据
    var str = '';
    req.on('data',function(data){
        str+=data;
    });
    req.on('end',function(){
        var obj=urlLib.parse(req.url,true);
        var url = obj.pathname;
        const GET = obj.query;
        const POST = querystring.parse(str);
        if(url=='/user'){                                              //区分 -> 接口，文件
            switch(GET.act){
                case 'reg':
                    if(users[GET.user]){            //json不像数组那样需要遍历
                        res.write('{"ok":false,"msg":"此用户已存在"}');
                    }else{
                        users[GET.user]=GET.pass;
                        res.write('{"ok":true,"msg":"注册成功"}');
                    }
                    break;
                case 'login':
                    if(users[GET.user]==null){
                        res.write('{"ok":false,"msg":"此用户不存在"}');
                    }else if(users[GET.user]!=GET.pass){
                        res.write('{"ok":false,"msg":"用户密码有误"}');
                    }else{
                        res.write('{"ok":true,"msg":"登录成功!"}');
                    }
                    break;
                default:
                    res.write('{"ok":false,"msg":"未知的act"}');
            }
            res.end();
        }else{
            var file_name = './www'+url;                                //读取文件
            fs.readFile(file_name,function(err,data){
                if(err){
                    res.write('404');
                }else{
                   res.write(data);
                }
                res.end();
            });
        }
    });
});
server.listen(8080);