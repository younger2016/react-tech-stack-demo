// 将根目录下 common、client 文件夹的程序，从 es6 转到 es5
require('source-map-support').install()
require('babel-polyfill')
require('babel-register')({
  sourceMaps: true,
  extensions: ['.js', '.jsx'],
  presets: ['react']
})
require('./app')
