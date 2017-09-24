/**
 * Created by MintWind on 2017/3/17.
 */
const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req,res){
    var file_name = './Mint'+req.url;
    fs.readFile(file_name,function(err,data){
        if(err){
            console.log('404');
        }else {
            res.write(data);
        }
            res.end();   //结束响应，告诉客户端所有消息已经发送。当所有要返回的内容发送完毕时，该函数必须被调用一次。如何不调用该函数，客户端将永远处于等待状态。
    });
});
server.listen(8089);