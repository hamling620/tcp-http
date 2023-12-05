const Application = require('./application')
const Router = require('./router')

// 工厂函数，返回一个application
function createApplication () {
  return new Application()
}
exports.Router = Router
module.exports = createApplication
