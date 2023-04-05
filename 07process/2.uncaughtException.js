setTimeout(() => {
  console.log('hello')
}, 3000)

// method()
// 需要先监听

process.on('uncaughtException', err => {
  console.log(err)
})

method()
