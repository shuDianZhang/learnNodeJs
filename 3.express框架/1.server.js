const express = require('express');
var server = express();                     //创建服务
/*

    express框架：
       1.依赖中间件
    非侵入式 -> 原生的功能都有，还添加了新功能：
       req
       res

    三种接受用户请求的办法
       .get('/',function(req,res){})
       .post('/',function(req,res){})
       .use('/',function(req,res){})
 */
server.use('/1.html',function(req,res){        //当请求文件1.html的时候，执行函数
//  res.write({"a":12,"b":19});                //会报错，不支持json
    res.send({"a":12,"b":19});
    res.end();
});
server.use('/2.html',function(req,res){
    res.send('123');
    res.end();
});
server.listen(8089);
