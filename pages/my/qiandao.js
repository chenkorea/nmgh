// pages/my/qiandao.js
var requestUtil = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiandaoAr: [],
    qiandaoShowAr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var dates = that.getNowFormatDate()
    var current_date = dates.split(' ')[0]
    var ymds = current_date.split('-')
    current_date = ymds[0] + '-' + ymds[1]
    that.getAllQianDaoByUser(current_date)
    // var months = that.last_year_month();
    // wx.showActionSheet({
    //   itemList: months,
    // })
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
  getAllQianDaoByUser: function (date_str) {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.getAllQianDaoByUser(function (e) {
          if (e.data.code == '1') {
            var dataAr = e.data.content
            var tempAr = []
            for (var i = 0; i < dataAr.length; i++) {
              var dataObj = dataAr[i]
              console.log(dataObj)
              if (dataObj.user_id == undefined || '' == dataObj.user_id) {
                tempAr[i] = '../image/qiandao_nor.png'
              } else {
                tempAr[i] = '../image/qiandao_sel.png'
              }
            } 
            that.setData({ qiandaoAr: e.data.content })
            that.setData({ qiandaoShowAr: tempAr })
            console.log(tempAr)
          }
        }, uid, date_str)
      },
    })
  },
  addQianDao:function(e) {
    var that = this
    var index = e.currentTarget.dataset.id

    var dates = that.getNowFormatDate()
    var current_date = dates.split(' ')[0]
    var ymds = current_date.split('-')
    var qian_month = ymds[0] + '-' + ymds[1]
    var qian_day = (index + 1) + ''
    var dddt = that.data.qiandaoAr[index].dt
    console.log('current_date = ' + current_date + '   dddt = ' + dddt)
    var user_id = that.data.qiandaoAr[index].user_id
    console.log('user_id = ' + user_id + '  index = ' + index)
    if (dddt == current_date) {
      // 今天
      if (user_id == undefined || '' == user_id) {
        // 可以点击
        that.addQianDaoRecord(qian_month, qian_day, current_date)
      } else {
        wx.setStorageSync('qiandao_date', current_date)
        wx.showModal({ title: '系统提示', content: '今天已经签到过啦，请明天在来哦！', showCancel: false })
      }
    } else {
      wx.showModal({ title: '系统提示', content: '当日签到只能签到当日日期！', showCancel: false })
    }

  },
  addQianDaoRecord: function (qian_month, qian_day, qian_days_str) {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.addQianDao(function (e) {
          if (e.data.code == '1') {
            wx.showToast({title: '今日签到成功',})
            wx.setStorageSync('qiandao_date', qian_days_str)
            var dates = that.getNowFormatDate()
            var current_date = dates.split(' ')[0]
            var ymds = current_date.split('-')
            current_date = ymds[0] + '-' + ymds[1]
            // 重新刷新签到记录
            that.getAllQianDaoByUser(current_date)
            
          }
        },uid, qian_month, qian_day, qian_days_str)
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
  /**
   * 获取前6个月
   */
  last_year_month:function () {
    var d = new Date();
    var result = [];
    for (var i = 0; i < 6; i++) {
      d.setMonth(d.getMonth() - 1);
      var m = d.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      //在这里可以自定义输出的日期格式
      //					result.push(d.getFullYear() + "-" + m);
      result.push(d.getFullYear() + "年" + m + '月');
    }
    return result;
  }
})