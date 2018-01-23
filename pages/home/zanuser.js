// pages/home/zan'user.js
var requestUtil = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zanUsers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var zan_id = options.zan_id
    that.getZanStepsById(zan_id)
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
  getZanStepsById: function (zan_id) {
    var that = this
    var dates = that.getNowFormatDate()
    var current_date = dates.split(' ')[0]
    requestUtil.getZanStepsById(function (e) {
      if (e.data.code == '1') {
        that.setData({zanUsers: e.data.content})
      }
    }, zan_id, current_date)
  },
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
    console.log('currentdate = ' + currentdate);
    return currentdate;
  },
})