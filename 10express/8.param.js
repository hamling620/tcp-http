const path = '/users/:name/:age'
const url = '/users/hamling/18'

const paramNames = []
const regStr = path.replace(/:(\w+)/g, (matched, group1) => {
  paramNames.push(group1)
  return '(\\w+)'
})
console.log(paramNames)
console.log(regStr) // /users/\w+/\w+

const reg = new RegExp(regStr)
const result = url.match(reg)
console.log(result)
const params = {}
for (let i = 0; i < paramNames.length; i++) {
  params[paramNames[i]] = result[i+1]
}
console.log(params)

// 正则得搞一搞
