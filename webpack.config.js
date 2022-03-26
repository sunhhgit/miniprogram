const { resolve } = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const runtimePlugin = require("@tinajs/mina-runtime-webpack-plugin")
const debuggable = process.env.BUILD_TYPE !== 'release'

module.exports = {
  context: resolve("src"),
  // entry: './app.js',
  entry: {
    "app": "./app.js",
    "pages/index/index": "./pages/index/index.js",
    "pages/logs/logs": "./pages/logs/logs.js"
  },
  output: {
    path: resolve("dist"),
    filename: "[name].js",
    globalObject: "wx" // 全局对象
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV) || "none",
      BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE) || "debug"
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: "**/*",
        to: "./",
        globOptions: {
          ignore: ["**/*.js"]
        }
      }]
    }),
    new runtimePlugin()
  ],
  optimization: {
    // 代码分离 允许把代码拆分到多个文件中，把那些依赖库拆分到完全分离的文件中，即使业务逻辑发生了更改，
    // 访问者也不需要再次下载依赖库，直接使用之前的缓存就可以了
    splitChunks: {
      chunks: "all",
      name: "common",
      minChunks: 2,
      minSize: 0 // SplitChunksPlugin默认地只会分离大于30Kb的文件
      // cacheGroups: {
      //   utilities: { // 为仅在utilities目录下的做代码分离处理
      //     test: /[\\/]src[\\/]utilities[\\/]/,
      //     minSize: 0
      //   }
      // }
    },
    runtimeChunk: {
      name: 'runtime' // 独立将运行时的webpack代码单独分离出来
    }
  },
  mode: debuggable ? "none" : "production"
}
