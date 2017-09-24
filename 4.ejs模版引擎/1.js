const ejs = require('ejs');
ejs.renderFile('./views/1.ejs',{name:'shujian',
    json:{
        arr:[{user:'Mint',pass:'123456'},{user:'shu',pass:'123456'},{user:'jian',pass:'123456'}]
    },
    type:'admin'/'user'
},function(err,data){
    console.log(data);
});

