// 此配置文件是用来定义开发环境和生产环境中所需要的参数
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')// path是node.js的路径模块，用来处理路径统一的问题

module.exports = {
  // 开发模式的一些配置
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {}, //下面是代理表，作用是用来，建一个虚拟api服务器用来代理本机的请求，只能用于开发模式

    // 各种开发服务器设置
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // 指定端口号、如果端口正在使用，则将确定一个空闲端口。
    autoOpenBrowser: true, //自动打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps（源代码地图）
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },




  // 下面是build也就是生产编译环境下的一些配置  
  build: {
    // Template for index.html
    // 下面是相对路径的拼接，假如当前跟目录是config，那么下面配置的index属性的属性值就是../dist/index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    // 下面定义的是静态资源的根目录 也就是dist目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 下面定义的是静态资源根目录的子目录static，也就是dist目录下面的static （换一个名字 会在dist下面再生成一个该名字的文件夹）
    assetsSubDirectory: 'static',
    // 下面定义的是静态资源的公开路径，也就是真正的引用路径 {dist/index里面文件引用的前缀(./static/xxx)}
    assetsPublicPath: './',

    /**
     * Source Maps（源代码地图）
     */
    // 下面定义是否生成生产环境的sourcmap，sourcmap是用来debug编译后文件的，通过映射到编译前文件来实现。就是生成static下面的.map文件  用来定位错误
    productionSourceMap: true,

    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
    productionGzip: false,
    // 下面定义要压缩哪些类型的文件
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 下面是用来开启编译完成后的报告，可以通过设置值为true和false来开启或关闭
    // 下面的process.env.npm_config_report表示定义的一个npm_config_report环境变量，可以自行设置
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
