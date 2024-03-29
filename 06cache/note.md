## HTTP缓存

### LastModified
- 上一次修改时间
- 用户访问静态文件的时候，服务端会检查if-modified-since请求头与当前文件的上一次修改时间进行对比，如果对比不成功说明是没有缓存的，服务器响应并设置LastModified响应头；如果下次用户访问的时候，请求头会带上相应的lastModifed设置的时间
- 如果对比成功，返回响应码304，告诉用户直接走浏览器缓存
- lastMofied的时间精确到秒，可能存在误差

### Etage
- etag访问机制与LastModified类似，它检查的是if-none-match响应头与etag（文件指纹）服务器响应会根据文件内容生成etag指纹，并设置etag响应头
- 根据文件内容生成指纹可能效率不高，可以根据修改时间和文件大小生成指纹
- 可以代替last-modified，Nginx的方案

### CacheControl
- 代替Expires请求头
- private 表示客户端可以进行缓存，public表示客户端和代理服务器都可以进行缓存
- max-age=60 表示60s内都获取缓存（浏览器Cache数据库）缓存不是小
- no-cache 强制进行协商缓存
- no-store 既不走强制缓存也不走协商缓存

### 强制缓存和协商缓存
- Cache-Control响应头
- 强制缓存，客户端第一次请求之后将文件和缓存规则保存在客户端缓存数据库中；第二次直接请求缓存数据库，看缓存是否过期，如果没过期，直接获取；如果过期了就向服务器请求然后重复第一次操作
- 协商缓存，客户端第一次请求，服务器会设置响应头etag（根据文件修改时间和大小生成的指纹）并直接返回文件；第二次请求的时候，客户端会带上上一次请求的指纹，其字段为if-none-match，服务器对比两个字段，如果相同，直接返回304，告诉客户端从缓存中获取文件
- 一般使用etag/if-none-match，last-modified/if-modified-since只能精确到秒，不精确
