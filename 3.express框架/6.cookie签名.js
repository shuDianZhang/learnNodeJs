/*
      想要加密:  cookie-encrypter
 */
const express = require('express');
const cookieParser = require('cookie-parser');
var server = express();

server.use(cookieParser('ghfhjvjbvf'));              //解析签名的cookie

server.use('/',function(req,res){
    req.secret='ghfhjvjbvf';                        //只是签名，不是为了隐藏，而是看出别人是否进行了修改
    res.cookie('user','shujian',{signed:true});
    res.send('ok');
    res.clearCookie('user');                         //删除cookie
    console.log('签名cookie:',req.signedCookies);
    console.log('未签名cookie:',req.cookies);
});
server.listen(8088);


