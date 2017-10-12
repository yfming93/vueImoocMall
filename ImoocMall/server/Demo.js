let user = require('./User');

console.log(`I'm :${user.userName} ； I say :${user.sayHello()}`);

let http = require('http');
let url = require('url');
let util = require('util');

let server =  http.createServer((req,res)=>{
  res.satatusCode = 200;
  res.setHeader("Content-Type","text/plain; charest=utf-8");

  console.log("url:"+req.url); //一段字符串路径。不全
  console.log(("parse:"+ url.parse(req.url))); //[object]
  console.log("inspect:"+util.inspect(url.parse(req.url)));
  res.end(util.inspect(url.parse(req.url)));
}).listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请在浏览器打开：http://127.0.0.1:3000/ 来进行访问");

  })

