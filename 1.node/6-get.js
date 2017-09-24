
// req.url

const http = require('http');
const urlLib = require('url');
var server = http.createServer(function(req,res){
   var GET =  urlLib.parse(req.url,true);
   console.log(GET.query);
    res.end();
});
server.listen(8099);
