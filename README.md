# JSONP-demo
JSONP是一种通过动态创建script的方式实现跨域请求的技术

演示过程如下:
1. 修改hosts文件，让jackma.com和poliyun.com都对应127.0.0.1
2. 开启node服务监听8080 和8081 两个端口
2. 浏览器输入jackma.com:8080请求到HTML页面
3. 在HTML页面中点击button动态创建script，其src指向poliyun.com:8081
4. 服务器根据请求的查询字符串创建一个xxx.call(undefined,'你要的数据')这样的响应
5. 浏览器收到来自poliyun.com:8081返回的数据，执行xxx.call(undefined,'你要的数据')

