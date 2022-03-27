function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
};

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')
// 引用云数据库
// const db = wx.cloud.database()

function getData(url){
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}
// function getData(db_name) {
//   const _userInfo = getApp().globalData.userInfo || {}
//   const _token = _userInfo.token;
//
//   return new Promise((resolve, reject) => {
//     // 查询当前环境，获取表
//     db.collection(db_name).where({
//       _openid: 'user_openId'
//     }).get({
//       success: res => {
//         console.log('[数据库][查询]：成功', res)
//         const data = res.data[0];
//         console.log('find result', data)
//         resolve(data)
//       },
//       fail: err => {
//         wx.showToast({
//           title: '查询失败',
//         })
//         reject(err)
//       }
//     })
//   })
// }

function getData2(){
  return index.index;
}

function getNext(){
  return index_next.next;
}

function getDiscovery(){
  return discovery.discovery;
}

function discoveryNext(){
  return discovery_next.next;
}



module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
