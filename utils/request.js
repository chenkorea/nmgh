
// 上传用户信息
function addUser(callback, uid, nickname, head_img, open_id) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/addUser";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      nickname: nickname,
      head_img: head_img,
      open_id: open_id
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      console.log(res);
      callback(res);
    }
  })
}

// 获取今日排名信息
function getStepsRankByUser(callback, uid, riqi, pageCount, pageNum) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getStepsRankByUser";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      riqi: riqi,
      pageCount: pageCount,
      pageNum: pageNum
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取今日排名信息
function getStepsRankByDates(callback, dates, pageCount, pageNum) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getStepsRankByDates";
  wx.request({
    url: remoteUrl,
    data: {
      dates: dates, 
      pageCount: pageCount, 
      pageNum: pageNum
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取今日排名信息
function get7DayStepsByUser(callback, uid) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/get7DayStepsByUser";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取所有活动
function getAllAdvert(callback) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getAllAdvert";
  wx.request({
    url: remoteUrl,
    data: {
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取所有活动
function getAdvertByType(callback, ad_type) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getAdvertByType";
  wx.request({
    url: remoteUrl,
    data: {
      ad_type: ad_type
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取微信解密
function getWxAesContent(callback, encryptedData, iv, open_id, session_key) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getWxAesContent";
  wx.request({
    url: remoteUrl,
    data: {
      encryptedData: encryptedData, 
      iv: iv, 
      open_id: '', 
      session_key: session_key
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}


// 获取用户所有步数
function getAllStepsByUser(callback, uid) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getAllStepsByUser";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取上传用户当日步数
function addUserSteps(callback, uid, step_riqi, steps) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/addUserSteps";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      step_riqi: step_riqi,
      steps: steps
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取用户当日步数排名
function getUserStepsRankByUser(callback, uid, step_riqi) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getUserStepsRankByUser";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      riqi: step_riqi
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取活动详细
function getAdvertDetail(callback, adid) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getAdvertDetailById";
  wx.request({
    url: remoteUrl,
    data: {
      ad_id: adid
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取签到
function getAllQianDaoByUser(callback, uid, date_str) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getAllQianDaoByUser";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      date_str: date_str
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 签到
function addQianDao(callback, uid, qian_month, qian_day, qian_days_str) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/addQianDao";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      qian_month: qian_month,
      qian_day: qian_day,
      qian_days_riqi: qian_days_str
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 往期活动
function getAdvertOutTime(callback) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getAdvertOutTime";
  wx.request({
    url: remoteUrl,
    data: {
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 往期步数
function getHistoryStepsByUser(callback, uid) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getHistoryStepsByUser";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 查询点赞的人
function getZanStepsById(callback, zan_id, date_str) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getZanStepsById";
  wx.request({
    url: remoteUrl,
    data: {
      zan_id: zan_id,
      date_str: date_str 
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 点赞和取消点赞
function addLikeStep(callback, uid, step_id, zan_riqi, islike) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/addLikeStep";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid, 
      step_id: step_id, 
      zan_riqi: zan_riqi, 
      islike: islike
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取微信openID
function getWXXopenId(callback, code) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getWXXopenId";
  wx.request({
    url: remoteUrl,
    data: {
      code: code
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 贵阳天气预报
function getWeather(callback) {
  var remoteUrl = "https://api.thinkpage.cn/v2/weather/all.json?city=%E8%B4%B5%E9%98%B3&language=zh-chs&unit=c&aqi=city&key=OD8GU1GW2O";
  wx.request({
    url: remoteUrl,
    success: function(res) {
      callback(res)
    }
  })
  // wx.request({
  //   url: remoteUrl,
  //   data: {
  //   },
  //   method: 'GET',
  //   header: { 'content-type': 'application/x-www-form-urlencoded' },
  //   success: function (res) {
  //     callback(res);
  //   }
  // })
}

// 获取用户信息
function getUserInfo(callback, uid) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/getUserInfo";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}

// 获取用户信息
function updateUserInfo(callback, uid, realname, age, id_num, dep, user_phone, dep_phone) {
  var remoteUrl = getApp().globalData.serverIp + "wdstep/updateUserInfo";
  wx.request({
    url: remoteUrl,
    data: {
      uid: uid,
      realname: realname,
      age: age,
      id_num: id_num,
      dep: dep,
      user_phone: user_phone,
      dep_phone: dep_phone
    },
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      callback(res);
    }
  })
}



module.exports = {
  addUser: addUser,
  getStepsRankByUser: getStepsRankByUser,
  get7DayStepsByUser: get7DayStepsByUser,
  getAllAdvert: getAllAdvert,
  getWxAesContent: getWxAesContent,
  getAllStepsByUser: getAllStepsByUser,
  addUserSteps: addUserSteps,
  getUserStepsRankByUser: getUserStepsRankByUser,
  getAdvertByType: getAdvertByType,
  getAdvertDetail: getAdvertDetail,
  getStepsRankByDates: getStepsRankByDates,
  getAllQianDaoByUser: getAllQianDaoByUser,
  addQianDao: addQianDao,
  getAdvertOutTime: getAdvertOutTime,
  getHistoryStepsByUser: getHistoryStepsByUser,
  getZanStepsById: getZanStepsById,
  addLikeStep: addLikeStep,
  getWeather: getWeather,
  getWXXopenId: getWXXopenId,
  updateUserInfo: updateUserInfo,
  getUserInfo: getUserInfo
} 