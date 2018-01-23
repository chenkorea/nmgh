// pages/my/myinfo.js
var requestUtil = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realname:'',
    age:'',
    idcard:'',
    dep:'',
    dep_phone: '',
    user_phone: '',
    myUserInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getUserInfo()
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
  
  },
  saveInfo: function () {
    var that = this
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.updateUserInfo(function (e) {
          if (e.data.code == '1') {
            wx.showToast({title: '修改成功',})
          }
        }, uid, that.data.realname, that.data.age, that.data.idcard, that.data.dep, that.data.user_phone, that.data.dep_phone)
      },
    })
  },
  bindNameInput: function(e) {
    this.setData({
      realname: e.detail.value
    })
  },
  bindAgeInput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  bindIdInput: function (e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  bindDepInput: function (e) {
    this.setData({
      dep: e.detail.value
    })
  },
  bindUserPhoneInput: function (e) {
    this.setData({
      user_phone: e.detail.value
    })
  },
  bindDepPhoneInput: function (e) {
    this.setData({
      dep_phone: e.detail.value
    })
  },
  getUserInfo: function () {
    var that = this
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.getUserInfo(function (e) {
          if (e.data.code == '1') {
            if (e.data.content != undefined && e.data.content.length > 0) {
              var nowInfo = e.data.content[0]
              that.setData({ myUserInfo: e.data.content[0] })
              that.setData({ realname: nowInfo.realname})
              that.setData({ age: nowInfo.age })
              that.setData({ dep: nowInfo.department })
              that.setData({ idcard: nowInfo.id_number })
              that.setData({ user_phone: nowInfo.user_phone })
              that.setData({ dep_phone: nowInfo.dep_phone })
            }
          }
        }, uid)
      },
    })
  },
})