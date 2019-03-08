'use strict'
// dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）
// 而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里我先分析webpack.base.conf.js。

// webpack.base.conf.js主要完成了下面这些事情：

// 1,配置webpack编译入口
// 2,配置webpack输出路径和命名规则
// 3,配置模块resolve规则
// 4.,配置不同类型模块的处理规则
// 说明： 这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面另行配置。



const path = require('path')//path模块不用说大家肯定都知道，是理一些路径的，无论是在这个配置里还其它配置中，这个是必不可少的
const utils = require('./utils')//util是对vue-loader对于css预编译一些提取的工具模块，因为对于个人开发而言，在里面提供了，sass,less,stylus,possCss等一系列预编译解析的loader
const config = require('../config')//config是对开发环境和生产环境的一系列不同参数的，路径等配置
const vueLoaderConfig = require('./vue-loader.conf')//vueLoaderConfig也是同样基础生产环境和开发环境对vue-loader进行的配置

// 这封装了一个函数，进行传参，获取绝对路径，方便对import时引入地址的方便填写
function resolve(dir) {
  // path.join()是对多个字符串进行拼接。此时__dirname是build文件路径  ..代表再出去一层，就是文件的根路径，那dir这个参数则是你要传的文件夹，如果我们传src的话就是从src目录开始找
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  // webpack入口文件。我们打包的时候入口js文件肯定是main.js如果你强烈自己想换文件名也没有问题，
  // 但是有一点，如果无论是执行的是build.js还是dev-sever.js，
  // 这个路径应该是../src/main.js 但是为什么是当前路径呢，因为有一个content执行上下文的东西，默认执行的就是你的根目录
  entry: {
    app: './src/main.js'
  },




  
  // webpack输出路径和命名规则
  output: {
    //webpack输出的目标文件夹路径 （如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）当进行环境是生产环境的话  我们就用config文件中config.build.assetsPublicPath这个属性，
    // 如果是生产环境 ，我们则用config.dev.assetsPublicPath中的属性
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },


  // 模块resolve的规则
  resolve: {
    // extensions 是对模块的后缀进行解析，当我们引入自己写的模块，比方说var config = require('../config') ，
    // webpack.base里引入了config模块的时候，没有带js后缀，那文件会不会识别，本质上不会识别，但是有了这个配置，会先进.js后缀进行匹配，没有再匹配.vue，没有再匹配.json，还是没有找到的话,则会报错，文件没有找到no find
    extensions: ['.js', '.vue', '.json'],
    // alias 是配置别名，什么是别名呢，如果你在一个很深的文件引入其它文件中又一个很深的文件，你会很烦，相对路径会写吐血，那用别名我们定入一个入口位置，
    // 我们@来代替src目录的绝对路径，此时就用到了上面function resolve封装的函数，此时就绝对路径就定位到了src目录，因为我们所有文件都放在src目录下，我们就可以通过src目录直接定位到你想要找的文件
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },




  // 不同类型模块的处理规则
  module: {
    rules: [
      {// 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        // 配置 
        options: vueLoaderConfig
      },
      {// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {// 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹(有img文件夹就会转移到img文件夹，如果没有，就会创建一个img文件夹)
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {// 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
           // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {// 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // node主要是阻止一些webpack的默认注入行为，因为在vue中，已经具备了这些功能
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
