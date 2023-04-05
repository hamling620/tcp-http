
let r = process.memoryUsage()
console.log(r)
// {
//   rss: 32108544, // Resident Set
//   heapTotal: 6119424, // 栈存储基本类型变量
//   heapUsed: 5339168, // 堆存储引用类型变量、闭包
//   external: 408830, // V8引擎内部C++对象 外部 Buffer等
//   arrayBuffers: 17606 // arrayBuffers
// }

Buffer.alloc(1024 * 1024 * 1024)
r = process.memoryUsage()
console.log(r)

// {
//   rss: 32837632,
//   heapTotal: 6651904,
//   heapUsed: 4624192,
//   external: 1074160783,
//   arrayBuffers: 1073758550
// }
