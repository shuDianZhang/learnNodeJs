/**
 * Created by MintWind on 2017/3/17.
 */
    /*
           post数据接收
           req.on('data',function(){});
           req.on('end',function(){});

           post数据接收： post数据比get大得多

           post很大 ---- 分段发送
     */
var http = require('http');
http.createServer(function(req,res){
    //data - 有一段数据到达就会发生（很多次）
    var str='';         //接收数据
    req.on('data',function(data){
        str+=data;
    });
    //end - 数据全部到达才发生(一次)
    req.on('end',function(){
        console.log(str);
    });
}).listen(8089);