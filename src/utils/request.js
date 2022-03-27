// 微信内接口都已cb形式做交互，容易形成回调地狱

// 方法一：webpack babel引入，做转义
// 方法二：小程序接口统一化，promise化
//  1、npm i --save wx-promise-pro  或者 npm install --save miniprogram-api-promise(https://ke.qq.com/itdoc/weixinapp/weixinapp-xp8138q6.html)
//  2、import { promisify } from 'wx-promise-pro'
//  3、promisify(wx.getUserProfile) 或者 wx.pro.getUserProfile({ desc: '' }).then(res => {})

// 业务接口 axios 的二次封装

// 封装方法一：
let promisify = func => args => new Promise((resolve, reject) => {
  func(Object.assign(args, {
    success: resolve,
    fail: reject,
  }))
})

let _login = promisify(wx.login) // 将wx.login转成Promise形式的方法

_login().then(res => console.log)
// 以上这种方式比较麻烦，每次调用都需要手动转换。

// 封装方法二： 劫持wx对象，进行全局统一封装
let originalWX = wx
let hasCallback = obj => {
  let cbs = ['success', 'fail', 'complete']
  return Object.keys(obj).some(k => cbs.includes(k))
}
originalWX = new Proxy({}, {
  get(target, name) {
    if (name in originalWX ) {
      let fn = originalWX[name]
      let isSyncFunc = name.endsWith('Sync') // 同步函数
      let isNotFunc = typeof fn !== 'function' // 非函数

      if (isSyncFunc || isNotFunc) return fn

      return (obj) => {
        if (!obj) return fn()
        if (hasCallback(obj)) return fn(obj)
        return promisify(fn)(obj)
      }
    }
  }
});



// 封装方法三：
const toPromise = (fn) => {
  // 这个api不是一个方法，直接返回该api
  if (typeof fn !== 'function') return fn;
  return (args = {}) => {
    // 这个api的参数不是对象，直接返回方法（参数）
    if (typeof args !== 'object') {
      return fn(args);
    }
    // 这个api是有sussess和fail这样子的回调函数 就有promise方法
    return new Promise((resolve, reject) => {
      args.success = resolve;
      args.fail = reject;
      fn(args);
    });
  };
};
export default Object.keys(wx).reduce((o, name) => {
  o[name] = toPromise(wx[name]);
  return o;
}, {});


import wxp from '../../utils/request';
// ...

// ...
wxp.request({
  url: 'url1',
}).then((res) => {
  // url1 success
  return wxp.request({
    url: 'url2',
  });
}, (res) => {
  // url1 fail
}).then((res) => {
  // url2 success
}, (res) => {
  // url2 fail
});
// ...


// 封装方法四：
const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params)
    })
  }
},
getImageInfo = promisify(wx.getImageInfo)

getImageInfo({
  src: 'http://www.a.com/a.png'
}).then(res=>{
// ...
}).catch(err=>{
// ...
})
