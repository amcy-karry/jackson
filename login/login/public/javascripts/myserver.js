const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const ejs = require('ejs');
// const { readFile } = require('fs/promises');
// const { Console } = require('node:console');

var template = fs.readFileSync(__dirname +'/forun.ejs','utf-8');
var posts = [];
             
const server = http.createServer((req,res) =>{
    console.log("req.method===>", req.method)
    if (req.method === "POST"){
        console.log("post===>")
        //表单提交
        req.data = "";
        
        req.on("readable",function(){
            //表单数据收集
            var chr = req.read();
            if (chr)
                req.data +=chr
            console.log("1===>",req.data)
        });
        req.on("end",function(){
            //表单处理
            var query = qs.parse(req.data);
            posts.push (query.content);
            console.log("2 query===>", query)
            console.log("2 posts===>", posts)

            showform(posts,res);
        });
    }else{
        //表单显示
        showform(posts,res);
    }
});

const hostname= '127.0.0.1';
const port = 3000;
server.listen(port,hostname,() =>{
    console.log (`sever running at http://${hostname} : ${port}/`);
});

function showform(p_posts,res){
    var data = ejs.render(template,{
        title:'hello ejs',
        posts: p_posts//['geddy', 'neil', 'alex']
    });
    res.setHeader('content-type','text/html');
    res.statusCode = 200;
    res.end(data);
}



