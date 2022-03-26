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

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
