
### localStorage和sessionStorage
- localStorage是本地存储，一个网站只有一个，如果用户不删除，就不会消失
- sessionStorage是会话存储，一个会话只有一个
- 比如单页应用打开两个会话，只能使用sessionStorage
- 以上两个都是存在浏览器，服务器无法获取；都不支持跨域
- 每个域名下的大小限制都是5M~10M
- getItem()、setItem()、removeItem()、clear()

### cookie
- HTTP是无状态协议，使用cookie携带信息进行用户认证
- 一般浏览器，单个cookie的大小不超过4k，cookie的数量限制是20个
- cookie在父域上设置，其子域也可以获取
- cookie不支持敏感信息，为了防止cookie被篡改，还应该为cookie加上签名（加盐）
- k1=v1; 
- domain表示可以在哪个域名下读取
- path表示以某个path开头，进行设置和读取
- httpOnly 表示只能在HTTP获取，客户端无法获取
- maxAge 表示生效时间，单位为s
- expires 表示失效时间
- secure 表示在https中有效

### session
- 可以理解为服务端的对象
- 存储敏感信息，但是会给用户一个唯一标识（sessionId）设置到cookie中需要用户请求的时候携带cookie，session基于cookie
- session的缺陷就是服务器重启后就丢失了，需要存储session对象(redis或mongodb)

### JWT（JSON Web Token）
- jwt和cookie签名类似
- jwt不存在跨域问题，可以使用在cookie、header或者url的query中
- jwt存在三个部分：头部{ type: 'JWT', alg: 'SH256'}、payload和前两个部分加一起的签名
- jwt无需存储