const Application = require('./application')
const Router = require('./router')

function createApplication () {
  return new Application()
}
createApplication.router = Router
module.exports = createApplication
