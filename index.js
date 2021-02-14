var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

var server  = http.createServer(function(request,response){
    var temp = url.parse(request.url,true)
    var path = temp.pathname
    var query = temp.query
    var method = request.method

    if(path === '/'){// 如果用户请求的路径是/
        var string = fs.readFileSync('./index.html','utf8')
        var amount = fs.readFileSync('./db','utf8')
        string = string.replace('&amount&',amount)
        response.setHeader('Content-type','text/html;charset=utf-8')
        response.write(string)
        response.end()
    }else if(path ==='/style.css'){
        var string = fs.readFileSync('./style.css','utf8')
        response.setHeader('Content-type','text/css')
        response.write(string)
        response.end()
    }else if(path === '/pay'){
        var amount = fs.readFileSync('./db','utf8')
        var newAmount = String(amount - 1)
        fs.writeFileSync('./db',newAmount)
        response.setHeader('Content-type','application/javascript;charset=utf-8')
        response.statusCode = 200
        response.write(`
        ${query.callback}.call(undefined,'success')
        `) 
        response.end()

    }else {
        response.statusCode = 404
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.write('路径不存在')
        response.end()
    }
})
server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)