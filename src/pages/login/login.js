// pages/login/login.js
var util = require('../../utils/util')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'hello login',
    userInfo: {},
    code: ''
  },
  // 获取code信息
  tapGetCode() {
    wx.login({
      success: res => {
        console.log('wx.login', res)
        const _code = res.code
        app.globalData.code = _code
        this.setData({
          code: _code
        })
      }
    })
  },
  tapGetInfo() {
    wx.getUserProfile({
      desc: 'desc',
      success: res => {
        console.log('wx.userProfile', res)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad')
    var _this = this
    // 实例方法获取全局登录态，确认如何显式
    app.getUserInfo(userInfo => {
      _this.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})