//app.js
var time = '';
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    time = true;
  },
  onShow: function (path) {
    console.log(this.globalData.isNoBind)
    /*if (this.globalData.isNoBind){
      if (time) {
        wx.redirectTo({
          url: 'pages/noBind/noBind'
        });
        time = false;
      } else {
        wx.redirectTo({
          url: '../noBind/noBind'
        });
      }
    }*/
  },
  onHide: function (shareTicket) {
    wx.setStorageSync('isfreshwx','1')
    console.log('shareTicket:' + shareTicket)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    isNoBind: true,
    // serverIp: "http://192.200.200.21:9000/sbb-web/phone/",
    serverIp: "https://www.gzwnks.com/sbb-web/phone/"
  }
})
