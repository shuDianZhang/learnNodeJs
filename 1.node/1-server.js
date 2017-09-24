/**
 * Created by MintWind on 2017/3/17.
 */
const http = require('http');        //引入系统模块http，只是用，并不会去修改，所以使用const
var server = http.createServer(function(request,response){        //当访问服务器的时候，执行回调函数
    console.log("123");      //往控制台输出
    switch(request.url){
        case "/1.html":
            response.write("This is 1.html Page");     //往浏览器页面输出
            break;
        case "/2.html":
            response.write("This is 2.html Page");
            break;
        default:
            response.write("404 Not Found");
            break;
    }
    response.end();
});
/*
      request    请求 - 输入 - 输入的信息
      response   响应 - 输出 - 输出的东西
 */
//监听 -- 等着
//端口 -- 数字
server.listen(8089);
