/**
 * Created by MintWind on 2017/3/17.
 */
const fs = require('fs');

//fs.readFile(文件名,回调函数);                    异步
fs.readFile('aaa.txt',function(err,data){
    if(err){
        console.log('未找到文件aaa.txt');
    }else{
        console.log("读取成功");
        console.log(data.toString());       //所有的对象都能toString()  ~
    }
});

//fs.writeFile(文件名，内容，回调函数);             异步
fs.writeFile('bbb.txt','this is test writeFile()', function (err) {
    console.log(err);
});