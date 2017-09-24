/*
    模板引擎：生成页面
      jade - 侵入式（破坏原有和html和js），强依赖
             1.根据缩进，规定层级
             2.属性放在()里面
             3.内容空个格，直接往后堆

             可以识别单双标签   双标签：<div></div>   单标签：<input />


             style     支持普通属性写法，json写法
             class     支持普通属性写法，数组写法

      ejs -  非侵入式，
 */

const jade = require('jade');
const fs = require('fs');
//var str = jade.render('html');          //渲染页面
var str = jade.renderFile('./views/1.jade',{pretty:true,name:'shujian',a:10,b:10,
json:{width:'200px',height:'100px',background:'red'},
arr:['sty2','sty3'],
arr2:['apple','orange','pear','banana'],
content:'<h2>这是测试jade的转义功能~</h2>'
});

fs.writeFile('./build/test.html',str,function(err){
    if(err){
        console.log('写入失败！');
    }else{
        console.log('写入成功！');
    }
});
console.log(str);
