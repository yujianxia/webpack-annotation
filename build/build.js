'use strict'
require('./check-versions')()

//这个文件的作用： 读取配置，完成打包

process.env.NODE_ENV = 'production' //全局的环境变量配置

const ora = require('ora') //实现node.js 命令行环境的 loading效果， 和显示各种状态的图标等
const rm = require('rimraf') // rimraf 包的作用：以包的形式包装rm -rf命令，就是用来删除文件和文件夹的，不管文件夹是否为空，都可以删除。
const path = require('path')  //node中的路径模块
const chalk = require('chalk') //chalk 包的作用是修改控制台中字符串的样式
const webpack = require('webpack') //打包插件
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf') //生产包的配置（文件的打包 压缩 优化 复制........）

const spinner = ora('building for production...')
spinner.start() //loading开始

// rm()方法打包之前先删除之前打包的文件和文件夹。 防止对打包的结果的影响
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 通过webpack打包
  // webpack打包有两种方式：1.通过全局shell命令行的形式 2.通过插件 函数调用的形式
  // 这里的打包方式是第2种
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    //设置打包过程的输入
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 打包的异常捕获
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    // 到这里就打包成功了
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
