// Node.js是单线程，只有一个线程执行所有操作，不能利用多核CPU（CPU密集型）
// Node.js提供了一个child_process模块，可以开启多个子进程，子进程之间共享内存空间，可以通过子进程的互相通信来实现信息的交换
// spawn 产卵

const { swapn } = require('child_process')
const path = require('path')

const p1 = swap('node', ['test1.js', 'a'], {
  cwd: path.join(__dirname, 'test1')
})

p1.on('close', () => {
  console.log('')
})