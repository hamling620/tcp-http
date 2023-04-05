# HTTP

## 长连接
- Connection: Keep-Alive
- http1.0版本默认不支持长连接，发送一个请求需要建立一次TCP连接，如果请求的静态资源过多，会造成性能浪费
- http1.1默认支持长连接
- TCP三次握手 SYN(客户端) -> SYN/ACK(服务器) -> ACK(客户端)
- TCP四次挥手 FIN(服务器) -> ACK(客户端) -> FIN(客户端) -> ACK(服务器)

## 管线化
- 并行处理请求响应（Chrome浏览器，在同域名下最大支持6个并行请求）

## URI和URL
- URI， Uniform Resource Identifier，统一资源标识符，在某个规则下能把这个资源独一无二的标识出来，比如身份证号。
- Uniform，不根据上下文来识别资源指定的访问方式
- Resource，可以标识的任何东西
- Identifier，标识可标识的对象

- URL，Uniform Resource Locator，统一资源定位符，表示资源的地点，URL是在浏览器访问Web页面时需要输入的网页地址
- Locator，定位
- URL的格式：http://user:password@www.example.com/dir/index.html?uid=1#ch1

## 请求报文
- 请求行 GET / HTTP1.1 (方法、路径、协议版本)
- 请求头（请求、通用、实体）
- 空行
- 请求行

## 响应报文
- HTTP1.1 200 OK（协议版本、状态码、状态原因短语）
- 响应头（响应、通用、实体）
- 空行（CR+LF）
- 响应体

## 方法
- GET，请求资源
- POST，向服务器发送数据，传输实体主题
- PUT，传输文件
- HEAD，获取报文首部
- DELETE，删除文件
- OPTIONS，询问支持的方法
- Trace，追踪路径

## 编码
- HTTP在传输的过程中，通过编码提升传输效率，但会消耗更多的CPU时间
- 请求的实体在尚未传输完成前，浏览器不能显示。所以在传输大容量数据时，通过把数据分割成多块，能让浏览器逐步显示页面

## 多部分对象集合
- 一份报文实体中可以包含多类型实体，使用boundary字符串来划分多部分对象指明的各类实体，在各类实体起始行之间插入--标记，多部分对象集合最后插入
- multipart/form-data（文件和数据上传）
- multipart/byteranges 206 Partial Content（断点续传）

## 内容协商
- Accept

## 状态码
- 状态码负责表示客户端请求数据的结果，标记服务器是否正常，通知出现的错误
- 1xx informational 信息性状态码
- 2xx success 成功状态码
- 200 OK 客户端发送过来的数据被正常处理
- 204 Not Content 正常响应，没有实体
- 206 Partial Content 范围请求，返回部分数据，响应报文中由Content-Range指定实体内容
- 3xx redirection 重定向状态码
- 301 Moved Permentaly 永久重定向
- 302 Found 临时重定向
- 303 See Other 和302类似，必须使用GET方法
- 304 缓存
- 307 Temporary Redirect 临时重定向，不改变请求方法
- 4xx client error 客户端错误
- 400 Bad Request 请求报文语法错误
- 401 unauthorizated 需要认证
- 403 Forbidden 服务器拒绝访问资源
- 404 Not Found 服务端无法找到资源
- 5xx server error 服务器端错误
- 500 Internal Server Error 服务器故障
- 503 Service Unavailable 服务器处于超负载或正在停机维护中

## 首部
- 待补充

# Web服务器
## 虚拟主机（Virtual Host）
- 一台HTTP服务器上搭建多个Web站点，客户端发送请求时，必须在HOST首部完整指出主机名或域名URL
## 通信转发程序（代理、网关）
### 代理
- 代理就是客户端和服务端中间人
- 利用缓存技术，减少访问流量
- 组织内部针对网站进行访问控制
- 获取访问日志
- 缓存代理：会预先把资源副本保存在服务器上
- 透明代理：不对报文进行任何加工
### 网关
- 接收客户端发送来的数据时，会转发给其他服务器处理，再由自己返回
- 使通信线路上的服务器提供非HTTP协议服务器
- 提高通信安全性
- 网关是对外的，服务器都是内部的（数据库服务器、消息队列服务器、缓存服务器等）
