#! /usr/bin/env node

const yargs = require('yargs')
const Server = require('../src/app')

const argv = yargs.option('d', {
  alias: 'root',
  demand: 'false',
  type: 'string',
  default: process.cwd(),
  description: '静态文件根目录'
}).option('o', {
  alias: 'host',
  demand: 'false',
  type: 'string',
  default: 'localhost',
  description: '请配置监听的主机'
}).option('p', {
  alias: 'port',
  demand: 'false',
  type: 'number',
  default: 8080,
  description: '请配置监听的端口号'
}).usage('z-server [options]')
.example('z-server -d / -o localhost -p 8080', '在本机的8080端口上监听客户端请求')
.help('h').argv


const server = new Server(argv)
server.start()
