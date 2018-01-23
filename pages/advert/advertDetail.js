var requestUtil = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ad_imgs: [],
    reward_imgs: [],
    rankDatas:[],
    dates:'',
    is_step_ad: '',
    adVertDetailVo: {},
    adVertDetailShowVo: {},
    ssss:'dsadsa\nkkdjskjds\ndsdsds'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var adId = options.ad_id
    var dates = options.dates
    var is_step_ad = options.is_step_ad
    that.setData({ dates: dates })
    that.setData({ is_step_ad: is_step_ad })
    that.getStepsRankByDates(dates)
    that.getAdvertDetail(adId)
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
  getAdvertDetail: function (adid) {
    var that = this;
    requestUtil.getAdvertDetail(function (e) {
      if (e.data.code == '1') {
        // 需要转格式
        var resultVo = e.data.content[0]
        var ad_imgs = []
        if (resultVo.ad_imgs != undefined) {
          ad_imgs = resultVo.ad_imgs.split(',')
        }
        var reward_imgs = []
        if (resultVo.reward_imgs != undefined) {
          reward_imgs = resultVo.reward_imgs.split(',')
        }
        var newEndDate = new Date();
        newEndDate.setTime(resultVo.ad_end_date)
        var newStartDate = new Date();
        newStartDate.setTime(resultVo.ad_start_date)
        var obj = {}
        obj.ad_end_date = newEndDate.toJSON().split('T')[0]
        obj.ad_start_date = newStartDate.toJSON().split('T')[0]
        obj.ad_imgs = ad_imgs
        obj.reward_imgs = reward_imgs
        obj.ad_key = resultVo.ad_key
        obj.ad_name = resultVo.ad_name
        obj.ad_content = resultVo.ad_content
        obj.reward_content = resultVo.reward_content
        obj.ad_type = resultVo.ad_type
        obj.id = resultVo.id
        obj.is_step_ad = resultVo.is_step_ad
        that.setData({ adVertDetailShowVo: obj })
        that.setData({ adVertDetailVo: resultVo })
        console.log(that.data.adVertDetailShowVo.reward_content)
      }
    }, adid)
  },
  openAdImgs: function () {
    var that = this;
    wx.previewImage({
      urls: that.data.adVertDetailShowVo.ad_imgs,
    })
  },
  openRwardImgs: function () {
    var that = this;
    wx.previewImage({
      urls: that.data.adVertDetailShowVo.reward_imgs,
    })
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
            that.setData({ rankDatas: e.data.content })
          }
        }, dates, '20', '1')
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
  toMoreView:function() {
    var that = this
    wx.navigateTo({
      url: './allavrank?dates=' + that.data.dates,
    })
  }
})