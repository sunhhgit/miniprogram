## 小程序
### 演变
* 1. 小程序最初的样子 - wxml wxss wxs => js
* 2. 原生部分支持npm => 类webpack配置&打包 => miniprogram_dist
* 3. 跨平台的需求 + babel + plugin + ut => 统一走webpack工程化环境
* ……CICD 集成布署

## 目标
1. 利用webpack，搭建远程小程序的工程化环境
2. 理解小程序能工程化的基础
3. 提炼小程序工程化与web工程化区别

## 开始
### 准备工作
#### 新建项目
* 1. 新建小程序项目
* 2. 初始化npm
* 部分npm报错
=> 面试题： 为何部分npm报在小程序中无法直接使用 / 小程序的执行环境和web区别 / 小程序开发中遇到过执行环境问题吗
=> 小程序的执行环境中，包解析编译时注入了上下文和全局环境
=> 所以说是类node/webpack模式
=> 通用的方式：clone源码手动编译 <===> jquery window this

#### 只有纯正的工程化webpack才能救开发
* 1. 安装webpack依赖
* 2. 增加webpack的基础配置
* 3. 调整小程序入口，指向webpack的产出dist
* 4. npx webpack!

#### 工程化小程序思路
1. 需要处理打包编译的部分，交给webpack
2. 无需处理的直接copy

#### 适应性进一步配置
1. 小程序为多页应用 => 调整多页entry适应路由
2. 需要做es的语法转换 => 引入并配置babelrc
3. 无需处理的直接copy => copy-webpack-plugin 忽略js

#### 性能优化
webpack打包多页应用 => 重复打包
```js
// 都会包含相同的runtime代码
(function(module）{
  // webpack runtime 代码
  // …… 
}()
```
1. 每个文件相对独立 => 重复打包混入相同的runtime代码 => 抽离重复的webpack runtime内容 => runtime trunk => 通过root改变挂载全局
2. 独立打包js，如何单独引入 => 小程序没有script这种挂载 => @tinajs/mina-runtime-webpack-plugin => 加入plugin套餐

面试题：
1. 难点 
  a. 点名难点 - 性能优化：文件大小优化、页面加载优化、依赖懒加载
  b. 困难or如何解决
    兼容性 + webpack + 性能
2. 优化
3. tree shaking
 lodash 模块的优化 - lodash-webpack-plugin babel-plugin-loadash

#### 开发优化 
1. 手动执行编译 => 自动化watch 
  => 1. npx webpack --watch --process 2. gulp watch

2. 自动化整合tree shaking

#### 多环境
面试题：webpack小程序的环境变量中为啥没有development => 小程序固定编译dist
* plugin 配置环境变量 => BUILD_TYPE => mode 
${process.env.NODE_ENV}  ${process.env.BUILD_TYPE}

#### 完全体 - 完善脚本
npm i --save-dev cross-env
* 完善package.json script入口

#### 拓展
如果要接入less做css的拓展操作

next class 小程序原理 + 生命周期 + api原理


# weapp-wechat-zhihu
```
git@github.com:RebeccaHanjw/weapp-wechat-zhihu.git
```
