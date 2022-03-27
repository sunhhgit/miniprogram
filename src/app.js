import moment from 'moment'
import { camelCase } from 'lodash'

// app.js
App({
  onLaunch() {
    console.log('moment111333555', moment().calendar())
    console.log('lodash', camelCase('abc def'))
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!wx.cloud) {
      console.error('当前环境不支持云能力，请升级')
    } else {
      // 云能力的初始化
      wx.cloud.init({
        traceUser: true
      })
    }
    this.globalData = {}

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getUserInfo:function(cb){
    const that = this
    if(this.globalData.userInfo){
    // typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
