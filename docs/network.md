## 计算机网络

### http 特点

- 特点：无连接、无状态、灵活、简单快速
- 无状态、不安全、明文传输、队头阻塞

因此需要 HTTPS 补充密文传输以及安全问题

队头阻塞问题：只建立一个TCP连接，同一时刻只能处理一个请求

### option 作用

- 获取服务端支持的所有 request methods
- 在复杂请求时进行预检

### get post 区别

- get 参数 url post 大多数使用 request body 
- get 请求幂等

### put post 区别

语义上 post 用于新增数据 ，put 用于修改数据，因此 put 具备幂等性

### http 状态码

301	Moved Permanently 永久重定向（网站更换域名）
302	Found 临时重定向（中间跳转页）
304	Not Modified 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。可以使用缓存的资源，不用在服务器获取。当协商缓存命中时会返回这个状态码。

### HTTP keep-alive 
持久连接的好处在于减少了 TCP 连接的重复建立和断开所造成的额外开销，减轻了服务器端的负载。另外， 减少开销的那部分时间，使 HTTP 请求和响应能够更早地结束，这样 Web 页面的显示速度也就相应提高了。
HTTP1.1规定了默认保持长连接，数据传输完成了保持TCP连接不断开，等待在同域名下继续用这个通道传输数据。如果需要关闭，需要客户端发送Connection：close首部字段。HTTP1.0版本是默认没有Keep-alive的（也就是默认会发送keep-alive），所以要想连接得到保持，必须手动配置发送Connection: keep-alive字段。若想断开keep-alive连接，需发送Connection:close字段；
