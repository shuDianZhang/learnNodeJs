/**
 * Created by MintWind on 2017/3/18.
 */
/*
    常用的模块：
       Crypto  加密
       Events  事件
       Net     网络操作
       OS      操作系统信息
       Path    处理文件路径
       Stream  流操作
       Timer   定时器    ->    每隔几分钟清理服务器垃圾文件  每隔几分钟更换密钥
       ZLIB    压缩      ->    原来文件是91.5k  但是只需要37k  就传输完毕

       自定义模块：
          1.模块组成
          2.npm
          3.发布自己的模块

          require   请求 ： 引入模块的
          module    模块 :  帮助咱们批量输出东西
          exports   输出
 */
// 没有全局变量，想对外输出什么，就往上加上exports
/*
exports.a = 12;
exports.b = 56;
exports.c = 77;


module.exports = {}、function() ....
require('xxxxx');  =>   {}、function()....

exports什么require就是什么...

*/

console.log(module.exports == exports);
module.exports={
    a:12,
    b:77,
    c:99
};
