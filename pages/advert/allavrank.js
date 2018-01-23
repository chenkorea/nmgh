var requestUtil = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad_imgs: [],
    reward_imgs: [],
    rankDatas: [],
    is_step_ad: '',
    dates:'',
    adVertDetailVo: {},
    adVertDetailShowVo: {},
    ssss: 'dsadsa\nkkdjskjds\ndsdsds',
    pageCount: 20,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var dates = options.dates
    that.setData({ dates: dates})
    that.getStepsRankByDates(dates)
    
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
  /**
   * 获取今日排名信息
   */
  getStepsRankByDates: function (dates) {
    var that = this;
    // var dates = that.getNowFormatDate()
    // var current_date = dates.split(' ')[0]
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.getStepsRankByDates(function (e) {
          if (e.data.code == '1') {
            var dataAr = e.data.content
            var orgAr = that.data.rankDatas
            orgAr.push.apply(orgAr, dataAr);
            that.setData({ rankDatas: orgAr })
          }
        }, dates, '' + that.data.pageCount, '' + that.data.pageNum)
      },
    })
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
    return currentdate;
  },
  toMoreView: function () {
    var that = this
    var num = that.data.pageNum + 1
    that.setData({ pageNum: num })
    console.log(that.data.dates)
    that.getStepsRankByDates(that.data.dates)
  }
})