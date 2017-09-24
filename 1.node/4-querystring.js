/**
 * Created by MintWind on 2017/3/17.
 */
/*
      数据请求——
        前台 --> form ajax jsonp
        后台 --> 一样
 */

/*
     主要使用处理 get请求方式的  数据
 */
const querystring = require('querystring');
var json = querystring.parse('user=Mint&pass=1234&age=19');
console.log(json);

const urlLib = require('url');
var json2 = urlLib.parse('http://www.baidu.com/index?a=12&age=20',true);  //true 加上后，可以解析query
console.log(json2);