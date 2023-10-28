## 同源策略
- 浏览器为了安全，只允许web页面请求同源（协议、域名、端口相同）的资源

### 1. JSONP
- jsonp利用`<script>`标签的src属性不受同源策略的影响，定义好回调函数，并把这个函数写到src路径当中
- 服务器接收到请求后，将数据填充到回调函数的参数中并返回给客户端
- 客户端接收到数据后，会调用定义好的回调函数并获得这个数据
- jsonp只能发送get请求，并且`<script>`标签可能被恶意站点利用,会遭受到跨站请求伪造（CSRF）攻击或XSS攻击

### 2. CORS
- Cross-Origin Resource Sharing 跨站资源共享
- 1. 简单请求
  - 方法为GET、POST或者HEAD，请求头Content-Type为application/x-www-urlencoded、application/plain、application/multipart-formdata中的一种
  - 没有自定义的请求头
  - 服务器端只要设置响应头Access-Control-Allow-Origin为*或者rea.headers.origin即可
- 2. 带预检（preflight）的跨域请求
  - 不是简单请求的都符合这种情况，客户端会发送一个方法为OPTIONS的预检请求，并且会设置请求头Access-Control-Request-Header和Acess-Control-Request-Method
  - 服务器直接响应OPTIONS请求，并且设置响应头Acess-Control-Allow-Headers、Access-Control-Allow-Methods等
  - 服务器设置Access-Control-Allow-Headers响应头表示允许的请求头，包括自定义请求头，如Content-Type,X-Token
  - Access-Control-Expose-Headers，用来设置客户端通过xhr.getResponseHeader()获取到的响应头
  - Access-Control-Allow-Credentials，允许用户请求时携带Cookie
  - Access-Control-Max-Age，设置preflight请求的缓存时间，单位为秒，这个时间内，客户端无需发送options请求

### 3. PostMessage
  - WebAPI，用于在不同浏览器上下文之间进行安全的跨源通信，如不同的窗口、iframe或者工作线程
  - 发送消息postMessage，注册message事件接受消息

### 4. http-proxy-middleware
- 正向代理，从局域网向外部访问时经过内部的代理服务器
- 反向代理，访问一个服务器（devServer），然后将请求发送到另一个服务器
- Node中间件，在应用中创建一个反向代理，在这里添加跨域请求、负载均衡，或者在开发环境中连接到不同的服务器

### 5. todo
- websoket
- nginx
- window.name
- location.hash
- document.domain
