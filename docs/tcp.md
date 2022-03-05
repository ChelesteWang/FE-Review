TCP和UDP的比较

| 对比  | UDP | TCP |
| --- | --- | --- |
| 是否连接 | 无连接 | 面向连接 |
| 是否可靠 | 不可靠传输，不使用流量控制和拥塞控制 | 可靠传输，使用流量控制和拥塞控制 |
| 连接对象个数 | 支持一对一，一对多，多对一和多对多交互通信 | 只能是一对一通信 |
| 传输方式 | 面向报文 | 面向字节流 |
| 首部开销 | 首部开销小，仅8字节 | 首部最小20字节，最大60字节 |
| 适用场景 | 适用于实时应用（IP电话、视频会议、直播等） | 适用于要求可靠传输的应用，例如文件传输 |

很多大公司面试喜欢问这样一道面试题，输入URL到看见页面发生了什么？今天我们来总结一下。

总体来说分为以下几个过程:

- **浏览器缓存**
- **DNS 解析：将域名解析成 IP 地址**
- **TCP 连接：TCP 三次握手**
- **发送 HTTP 请求**
- **服务器处理请求并返回 HTTP 报文**
- **浏览器解析渲染页面**
- **断开连接：TCP 四次挥手**

b站视频讲的很好
https://www.bilibili.com/video/BV1kV411j7hA

为什么要三次握手而不是两次

1. 第一次客户端初始化 init 发送 syn 给服务端进入 syn-send 状态
2. 服务端收到后响应 ack + syn 进入 syn-recv 状态
3. 客户端收到后响应 ack 进入 established 状态
4. 服务端收到进入 established 状态

第三次是为了在不可靠的网络环境中建立可靠的连接，因为防止丢包，服务端响应之前的包新建连接，两次握手后进入等待数据状态

如何处理丢包和顺序，建立发送缓冲区，0 - n 客户端发送报文后服务端需要响应报文，ack 缓冲区的下一个包序号 + 长度，收到所有包后可以根据序号重新排序，丢包后也可以根据排序找到丢失的包

为什么要进行四次挥手

1. 客户端从 establish 状态发送 fin 后进入 fin-wait-1 状态
2. 服务端收到后响应 ack 并进入 close-wait 状态，检查是否有未发送的数据，当前客户端还可接收数据进入半双工状态，客户端进入 fin-wait-2 状态.
3. 服务端确保无数据发送发送 fin 进入 last-ack 状态
4. 客户端收到响应 ack 进入 time-wait 状态
5. 服务端收到进入 close 状态，客户端超时等待结束进入 close 状态

为啥要 time wait 

如果客户端收到 fin 包后响应 ack 包丢失了，服务端会重新发送 fin 包，客户端重新响应 ack 包并更新超时时间，如果直接关闭就会导致服务端无法响应。
