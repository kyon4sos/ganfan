// miniprogram/pages/center/center.js
import {
  func
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {
      nickName: null,
      avatarUrl: "",
      point: 0,
      balance: 0
    }
  },

  // async handleLogin() {
  //   if (!this.data.userInfo.nickName) {
  //     console.log("handleRegister");
  //     this.handleRegister()
  //   } else {
  //     this.initUserInfo()
  //   }
  // },
  async handleRegister() {
    try {
      const userInfo = await wx.getUserProfile({
        desc: "展示用户信息"
      })
      let res = await func('register', userInfo)
      console.log(res);
      this.initUserInfo(res.result)
    } catch (error) {
      console.log('失败');
      wx.showToast({
        title: '请允许授权',
        icon: 'error',
        duration: 2000
      })
    }
  },
  async checkFirstLogin() {
    // const token = wx.getStorageSync('token')
    const res = await func('checkFirstLogin')
    console.log(res);
    if (res.result.code == 20001) {
      console.log(res.result.code);
      this.setData({
        isLogin: false
      })
    }
    if (res.result.code == 20000) {
      this.initUserInfo(res.result)
      this.setData({
        isLogin: true
      })
    }
  },
  async initUserInfo(data) {
    wx.setStorage({
      data: data.token,
      key: 'token',
    })
    this.setData({
      userInfo: {
        ...data.userInfo
      },
      isLogin: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload");
    this.checkFirstLogin()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady", Date.now());
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow", Date.now());
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide", Date.now());
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload", Date.now());
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