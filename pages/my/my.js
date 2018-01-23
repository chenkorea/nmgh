// my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    head_img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    wx.getStorage({
      key: 'open_id',
      success: function(res) {
        that.getUserByOpenID(res.data);
      },
    })
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

  // 获取用户
  getUserByOpenID: function (open_id) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'wdstep/getUserByOpenID',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        open_id, open_id
      },
      success: function (res) {
        console.log(res);
        var dataContentAr = res.data.content;
        if (dataContentAr.length = 1) {
          // 有用户信息
          var userinfo = res.data.content[0];
          var nickname = userinfo.nickname;
          var uid = userinfo.id;
          var head_img = userinfo.head_img;

          wx.setStorage({ key: 'uid', data: uid, })
          wx.setStorage({ key: 'nickname', data: nickname, })
          wx.setStorage({ key: 'head_img', data: head_img, })

          that.setData({ nickname: nickname});
          that.setData({ head_img: head_img});

        }
      }
    })
  },
  toQianDao: function () {
    wx.navigateTo({
      url: './qiandao',
    })
  },
  toHistoryAd: function () {
    wx.navigateTo({
      url: './historyadvert',
    })
  },
  toHistorySteps: function () {
    wx.navigateTo({
      url: './historysteps',
    })
  },
  toMyInfo: function () {
    wx.navigateTo({
      url: './myinfo',
    })
  },
})