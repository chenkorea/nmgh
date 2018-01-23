//index.js
var requestUtil = require('../../utils/request.js');

//获取应用实例
var app = getApp()
var that;
var deltaX = 0;
var minValue = 1;
Page({
  data: {
    sevenRunDatas: [],
    sevenRunShowDatas: [],
    rankDatas: [],
    rankUserDatas: {},
    xingqi: '',
    step: 0,
    allSteps: 0,
    allStepsTip: '',
    user_id: '',
    weatherinfo: {},
    pageCount: 20,
    pageNum:1
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../morePages/morePages'
    })
  },
  onShow: function () {

    var that = this;
    // 获取今日排名
    that.getStepsRankByUser();
  },
  onLoad: function (options) {
    var that = this;
  },
  /**
   * 获取今日排名信息
   */
  getStepsRankByUser: function () {
    var that = this;
    var dates = that.getNowFormatDate()
    var current_date = dates.split(' ')[0]
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.getStepsRankByUser(function (e) {
          if (e.data.code == '1') {
            var dataAr = e.data.content
            var orgAr = that.data.rankDatas
            orgAr.push.apply(orgAr, dataAr);
            that.setData({ rankDatas: orgAr })
          }
        }, uid, current_date, ''+that.data.pageCount , ''+that.data.pageNum)
      },
    })
  },
  /**
   * get now date str
   */
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
  /**
   * string change date
   */
  strToDate: function (date_str) {
    var d = new Date(Date.parse(date_str.replace(/-/g, "/")));
    return d;
  },
  addLikeStep: function (ed) {
    var that = this;

    var step_id = ed.currentTarget.dataset.stepid
    var like_type = ed.currentTarget.dataset.type
    var ismy = ed.currentTarget.dataset.ismy
    var zanuser = ed.currentTarget.dataset.zanuser
    // 先判断是否是自己的排名
    if (that.data.user_id == zanuser) {
      // 自己的 点击查看人数
      wx.navigateTo({
        url: './zanuser?zan_id=' + step_id,
      })
    } else {
      // 别人的 点击点赞或者取消点赞
      var dates = that.getNowFormatDate()
      var current_date = dates.split(' ')[0]

      wx.getStorage({
        key: 'uid',
        success: function (result) {
          var uid = result.data;
          requestUtil.addLikeStep(function (e) {
            if (e.data.code == '1') {
              // 成功
              var tempAr = that.data.rankDatas
              if ('0' == like_type) {  // 取消
                for (var i = 0; i < tempAr.length; i++) {
                  var s_id = tempAr[i].id
                  if (s_id == step_id) {
                    tempAr[i].zan_num = parseInt(tempAr[i].zan_num) - 1
                    tempAr[i].is_my = '0'
                    break
                  }
                }
              } else { // 点赞
                for (var i = 0; i < tempAr.length; i++) {
                  var s_id = tempAr[i].id
                  if (s_id == step_id) {
                    if (tempAr[i].zan_num == undefined) {
                      tempAr[i].zan_num = 1
                    } else {
                      tempAr[i].zan_num = parseInt(tempAr[i].zan_num) + 1
                    }
                    tempAr[i].is_my = '1'
                    break
                  }
                }
              }
              that.setData({ rankDatas: tempAr })
            }
          }, uid, step_id, current_date, like_type)
        },
      })
    }
  },
  addMoreData: function() {
    var that = this
    var num = that.data.pageNum + 1
    that.setData({ pageNum: num})
    that.getStepsRankByUser();
  }

})