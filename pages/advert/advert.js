// advert.js
var requestUtil = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allAdverts:[],
    allShowAdverts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getAllAdvert();
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
   * 获取所有活动
   */
  getAllAdvert: function () {
    var that = this;
    requestUtil.getAllAdvert(function (e) {
      if (e.data.code == '1') {
        // 需要转格式
        var allShAdverts = []
        for (var i = 0; i < e.data.content.length; i++) {
          var resultVo = e.data.content[i]
          var ad_imgs = resultVo.ad_imgs.split(',')[0]
          
          var newEndDate = new Date();
          newEndDate.setTime(resultVo.ad_end_date)
          var newStartDate = new Date();
          newStartDate.setTime(resultVo.ad_start_date)
          var obj = {}
          obj.ad_end_date = newEndDate.toJSON().split('T')[0]
          obj.ad_start_date = newStartDate.toJSON().split('T')[0]
          obj.ad_imgs = ad_imgs
          obj.ad_key = resultVo.ad_key
          obj.ad_name = resultVo.ad_name
          obj.ad_type = resultVo.ad_type
          obj.id = resultVo.id
          obj.is_step_ad = resultVo.is_step_ad
          if (resultVo.taps == undefined) {
            obj.taps = '1'
          } else {
            obj.taps = resultVo.taps
          }
          allShAdverts[i] = obj
        }
        console.log(allShAdverts);
        that.setData({ allAdverts: e.data.content })
        that.setData({ allShowAdverts: allShAdverts })
      }
    })
  },
  /**
   * 跳转活动分类查询页面
   */
  toNormal: function (e) {
    var type = e.currentTarget.dataset.type
    var tname = ''
    if (type == 1)
      tname = '常规赛'
    else if (type == 2)
      tname = '月度赛'
    else if (type == 3)
      tname = '长期赛'
    wx.navigateTo({
      url: './allAdvert?type=' + e.currentTarget.dataset.type + '&tname=' + tname,
    })
  },
  /**
   * 跳转活动详细页面
   */
  toAdDetail: function (e) {
    var that = this
    var adid = e.currentTarget.dataset.adid
    var dates = ''
    var is_step_ad = ''
    
    for (var i = 0; i < that.data.allShowAdverts.length; i++) {
      var obj = that.data.allShowAdverts[i]
      console.log(obj)
      if (adid == obj.id) {
        console.log(obj.ad_key)
        dates = obj.ad_key
        is_step_ad = obj.is_step_ad    
        break
      }
    }
    wx.navigateTo({
      url: './advertDetail?ad_id=' + adid + "&dates=" + dates + "&is_step_ad=" + is_step_ad,
    })
  },
})