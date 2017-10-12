let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');
let server =  http.createServer((req,res)=>{
  var pathName = url.parse(req.url).pathname; //拿到当前地址路径
  console.log("url:"+url.parse(req.url).pathname);
  fs.readFile(pathName.substring(1),function (err,data) {
    if (err) {
        res.writeHead(404,{
          'Content-Type':'text/html'
        });
    }else {
      res.writeHead(200,{
          'Content-Type':'text/html'
      });
      res.write(data.toString());
    };
    res.end();
  })
}).listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请在浏览器打开：http://127.0.0.1:3000/index.html 来进行访问");
})

