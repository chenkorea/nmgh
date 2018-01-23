//index.js
var requestUtil = require('../../utils/request.js');

//获取应用实例
var app = getApp()
var that;
var deltaX = 0;
var minValue = 1;
Page({
  data: {
    width: 0,
    height: 0,
    timeArry: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    animation: '',
    sevenRunDatas: [],
    sevenRunShowDatas: [],
    rankDatas: [],
    rankUserDatas: {},
    xingqi: '',
    step: 0,
    allSteps: 0,
    allStepsTip: '',
    user_id:'',
    weatherinfo:{}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
		  url: '../morePages/morePages'
		})
  },
  onShow: function () {

    console.log('conShow-------------')

    var that = this;
    // 获取微信用户信息
    var uid = wx.getStorageSync('uid')
    var isfreshwx = wx.getStorageSync('isfreshwx')
    if (isfreshwx == '1') {
      // 刷新微信 获取微信用户信息
      that.wxLogin();
      wx.setStorageSync('isfreshwx', '0')
    } else {
      if (uid != undefined) {
        // 获取微信运动信息
        that.getUserRunData();
        // 获取七天趋势
        that.get7DayStepsByUser();
        // 获取今日排名
        that.getStepsRankByUser();
        // 获取所有步数
        that.getAllStepsByUser();
        // 获取今日自己的排名信息
        that.getUserStepsRankByUser();
      }
    }
  },
  onLoad: function (options) {
    var that = this;
    // // 默认先绘画刻度
    // that.drawMeter('Temp', 0, '100');
    that.getWeather()

    // 判断是否签到
    var uid = wx.getStorageSync('uid')
    if (uid != undefined && "" != uid) {
      var dates = that.getNowFormatDate()
      var current_date = dates.split(' ')[0]
      var qiandao_date = wx.getStorageSync('qiandao_date')
      if (qiandao_date == current_date) {
        // 已经签到了
      } else {
        // 提示签到
        wx.showModal({
          title: '系统提示',
          content: '今天还没有签到哦，是否立即去签到？',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../my/qiandao',
              })

            } else {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
    

    // 获取当前星期几
    that.getXingQ();
    // 获取微信用户信息
    that.wxLogin();
        
    app.globalData.isNoBind = false;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    
    //获取系统信息  
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
      	
        that.width = res.windowWidth
        
        that.height = res.windowHeight*0.7*0.8;
        
        // 这里的单位是PX，实际的手机屏幕有一个Dpr，这里选择iphone，默认Dpr是2
      }
    })

    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left top 0',
      success: function (res) {
        // console.log(res)
      }
    })
  },
  rotate: function () {
    //顺时针旋转10度
    //
    this.animation.step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  onReady: function () {
    // this.drawMeter('Temp','23189','100');
  },
  // 所有的canvas属性以及Math.sin,Math.cos()等涉及角度的参数都是用弧度表示
  // 温度仪表盘
  drawMeter: function (name,value,maxvalue) {
    var that = this;
    var step = value;
    value = step/100;
    const ctx = wx.createCanvasContext(name);
    var width = this.width;
    var height = this.height;
    var R = width / 2 - 90;
    // console.log(width + '.....' + height);
    ctx.clearRect(0, 0, width, height); //清除画布   
    
		
    //圆形外面刻度               
    for (var i = 0; i < maxvalue; i++) {
      
      ctx.save();
      ctx.setLineWidth(2);
      ctx.setStrokeStyle('#33dad9');
      if (i > value) {
        ctx.setStrokeStyle('#1c2d39');
      } else if (i == 1) {
        ctx.setStrokeStyle('#32e0dc');
      }
      else if (i == 2) {
        ctx.setStrokeStyle('#2fddd5');
      }
      else if (i == 3) {
        ctx.setStrokeStyle('#2ae2d5');
      }
      else if (i == 4) {
        ctx.setStrokeStyle('#26e2d0');
      }
      else if (i == 5) {
        ctx.setStrokeStyle('#25e5cc');
      }
      else if (i == 6) {
        ctx.setStrokeStyle('#25e4c5');
      }
      else if (i == 7) {
        ctx.setStrokeStyle('#25e7c1');
      }
      else if (i == 8) {
        ctx.setStrokeStyle('#25e4b8');
      }
      else if (i == 9) {
        ctx.setStrokeStyle('#25e7b2');
      }
      else if (i == 10) {
        ctx.setStrokeStyle('#25e7a9');
      }
      else if (i == 11) {
        ctx.setStrokeStyle('#28e79f');
      }
      else if (i == 12) {
        ctx.setStrokeStyle('#35e08e');
      }
      else if (i == 13) {
        ctx.setStrokeStyle('#49e782');
      }
      else if (i == 14) {
        ctx.setStrokeStyle('#61e770');
      }
      else if (i == 15) {
        ctx.setStrokeStyle('#79e65e');
      }
      else if (i == 16) {
        ctx.setStrokeStyle('#94e54a');
      }
      else if (i == 17) {
        ctx.setStrokeStyle('#a9de38');
      }
      else if (i == 18) {
        ctx.setStrokeStyle('#c7e127');
      }
      else if (i == 19) {
        ctx.setStrokeStyle('#d9d91a');
      }
      else if (i == 20) {
        ctx.setStrokeStyle('#efd70d');
      }
      else if (i == 21) {
        ctx.setStrokeStyle('#fece03');
      }
      else if (i == 22) {
        ctx.setStrokeStyle('#f7c905');
      }
      else if (i == 23) {
        ctx.setStrokeStyle('#fbb904');
      }
      else if (i == 24) {
        ctx.setStrokeStyle('#f9a004');
      }
      else if (i == 25) {
        ctx.setStrokeStyle('#ff8504');
      }
      else if (i == 26) {
        ctx.setStrokeStyle('#ff680c');
      }
      else if (i == 27) {
        ctx.setStrokeStyle('#fa4a15');
      }
      else if (i == 28) {
        ctx.setStrokeStyle('#fa4a15');
      }
      else if (i == 29) {
        ctx.setStrokeStyle('#f4321d');
      }
      else if (i == 30) {
        ctx.setStrokeStyle('#ef1f22');
      }
      else if (i == 31) {
        ctx.setStrokeStyle('#ef1c23');
      }
      else if (i == 32) {
        ctx.setStrokeStyle('#eb1d24');
      }
      ctx.translate(width / 2, height / 2);
      ctx.rotate(i * 2 / maxvalue * Math.PI * 3.1 / 4 + 450);//i * 360/maxvalue * Math.PI / 180
      ctx.beginPath();
      ctx.moveTo(0, -(R + 20));  // 划线起点
      ctx.lineTo(0, -(R + 30));  // 划线始点
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      setTimeout(function () {
        
      }, 1000)
    }
		//设置中间字体
    ctx.setFillStyle('#666666');
    ctx.setFontSize(12);
    ctx.setTextAlign('center');
    ctx.fillText('今日步数', width / 2, height / 2-30);
    
    ctx.setFillStyle('#333333');
    ctx.setFontSize(45);
    ctx.fillText(step, width / 2, height / 2+30);

    var kaluli = Math.ceil(step * 0.04)
    ctx.setFillStyle('#36D88E');
    ctx.setFontSize(10);
    ctx.fillText('燃烧大卡 ≈ ' + kaluli + '卡', width / 2, height / 2 + 60);


    ctx.closePath(); //结束画布
    
    ctx.draw();
  },
  toto: function() {
    this.drawMeter('Temp', '389', '100');
  },
  /**
   * 获取微信登录
   */
  wxLogin: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;

        // 获取微信运动信息
        that.getUserRunData();

        wx.getStorage({
          key: 'open_id',
          success: function (result) {
            // 直接获取用户 但先要判断是否过期
            // session_key is out time
            var expires_in = wx.getStorageSync('expires_in')
            // convert date
            var expiresDate = that.strToDate(expires_in)
            // now date
            var nowDate = new Date();
            var date_num = nowDate.getTime() - expiresDate.getTime();   //时间差的毫秒数
            var seconds = Math.round(date_num / 1000)
            // if (seconds > 7000) {
              // 过期了 重新获取openId
              // that.getUserOpenId(code, e);
              that.getWXXopenId(code)
            // } else {
            //   that.getUserByOpenID(result.data);
            // }
          },
          fail: function (result) {
            // 失败就要重新获取openId
            // that.getUserOpenId(code, e);
            that.getWXXopenId(code)
          }
        })
      }
    });
  },
  getUserOpenId: function (code, e) {
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa3bd706f002af01d&secret=359aa8103b26a1ff7ecd8a049eb93948&js_code=' + code + '&grant_type=authorization_code',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // 成功获取Open_id
        console.log('000000000')
        console.log(res)
        var openIdStr = res.data.openid
        var session_key = res.data.session_key
        wx.setStorageSync('open_id', openIdStr)
        wx.setStorageSync('session_key', session_key)
        // 保存过期初始时间
        var nowExpressStr = that.getNowFormatDate()
        wx.setStorageSync('expires_in', nowExpressStr)
        that.getUserInfo(openIdStr);
      }
    })
  },
  getWXXopenId: function (code) {
    var that = this;

    requestUtil.getWXXopenId(function (e) {
      if (e.data.code == '1') {
        // 获取open_id成功
        console.log('获取open_id成功')
        console.log(e)
        var resultVo = JSON.parse(e.data.content[0])
        var openIdStr = resultVo.openid
        var session_key = resultVo.session_key
        wx.setStorageSync('open_id', openIdStr)
        wx.setStorageSync('session_key', session_key)
        // 保存过期初始时间
        var nowExpressStr = that.getNowFormatDate()
        wx.setStorageSync('expires_in', nowExpressStr)
        that.getUserInfo(openIdStr);
        
      }
    }, code)
  },
  // 获取用户信息
  getUserInfo: function (open_id) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        
        wx.getStorage({
          key: 'uid',
          success: function(res) {
            // 有UID
            that.addUser(open_id, res.data, avatarUrl, nickName);
          },
          fail: function(res) {
            // 第一次登录
            that.addUser(open_id, '', avatarUrl, nickName);
          }
        })
      }
    })
  },
  // 添加用户
  addUser: function (open_id, uid, head_img, nickname) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverIp + 'wdstep/addUser',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        nickname: nickname,
        uid: uid,
        head_img: head_img,
        open_id, open_id
      },
      success: function (res) {
        that.getUserByOpenID(open_id);
      }
    })
  },
  // 获取用户
  getUserByOpenID: function (open_id) {
    console.log('======getUserByOpenID========')
    
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
          var dataContentAr = res.data.content;
          if (dataContentAr.length = 1) {
            // 有用户信息
            var userinfo = res.data.content[0];
            var nickname = userinfo.nickname;
            var uid = userinfo.id;
            var head_img = userinfo.head_img;

            wx.setStorageSync('uid', uid)
            wx.setStorageSync('nickname', nickname)
            wx.setStorageSync('head_img',head_img)

            // 获取微信运动信息
            that.getUserRunData();
            // 获取七天趋势
            that.get7DayStepsByUser();
            // 获取今日排名
            that.getStepsRankByUser();
            // 获取所有步数
            that.getAllStepsByUser();
            // 获取今日自己的排名信息
            that.getUserStepsRankByUser();
          }
      }
    })
  },
  /**
   * 获取微信用户运动信息
   */
  getUserRunData: function() {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getWeRunData({
          success: function(data) {
            var encryptedData = data.encryptedData
            var iv = data.iv
            that.getWxAesContent(encryptedData, iv)
            console.log(data);
          }
        })
      }
    });
  },
  /**
   * 获取微信解密内容
   */
  getWxAesContent: function (encryptedData, iv) {
    var that = this;
    var uid = wx.getStorageSync('uid')
    var open_id = wx.getStorageSync('open_id')
    var session_key = wx.getStorageSync('session_key')
    
    requestUtil.getWxAesContent(function (e) {
      if (e.data.code == '1') {
        // 获取步数成功
        var resultVo = e.data.content[0]
        var resultVoobj = JSON.parse(resultVo)
        var stepInfoList = resultVoobj.stepInfoList
        
        // 获取最后一条数据 就是今天的数据
        var stepObj = stepInfoList[stepInfoList.length - 1]
        
        var step = stepObj.step
        // 上传步数
        that.addUserSteps(step)
        // 保存步数
        that.setData({ step: step })
        // 绘画刻度
        that.drawMeter('Temp', step, '100');
      }
    }, encryptedData, iv, open_id, session_key)
  },
  /**
   * 获取用户七天之内的数据
   */
  get7DayStepsByUser: function () {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function(result) {
        var uid = result.data;
        requestUtil.get7DayStepsByUser(function (e) {
          if (e.data.code == '1') {
            var dataContentAr = e.data.content;
            var dataAr = [];
            // 默认最高是15000步
            for (var i = 0; i < dataContentAr.length; i++) {
              var resultVo = dataContentAr[i];
              var obj = {};
              obj.day = resultVo.dt.substr(8, 2);
              if (resultVo.steps == undefined)
                obj.inf = 0;
              else
                obj.inf = resultVo.steps / 15000 * 100;
              dataAr[i] = obj
            }
            that.setData({ sevenRunShowDatas: dataAr });
            that.setData({ sevenRunDatas: dataContentAr });
          }
        }, uid)
      },
    })
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
            that.setData({ rankDatas: e.data.content})
          }
        }, uid, current_date, '20', '1')
      },
    })
  },
  /**
   * 获取今日自己的排名信息
   */
  getUserStepsRankByUser: function () {
    var that = this;
    var dates = that.getNowFormatDate()
    var current_date = dates.split(' ')[0]
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        that.setData({ user_id: uid})
        requestUtil.getUserStepsRankByUser(function (e) {
          if (e.data.code == '1') {
            if (e.data.content.length > 0) {
              that.setData({ rankUserDatas: e.data.content[0] })
            } else {
              that.setData({ rankUserDatas: {} })
            }
          }
        }, uid, current_date)
      },
    })
  },
  /**
   * 获取用户所有步数
   */
  getAllStepsByUser: function () {
    var that = this;
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.getAllStepsByUser(function (e) {
          if (e.data.code == '1') {
            that.setData({ allSteps: e.data.content[0].allsteps })
            var ins = Math.ceil(e.data.content[0].allsteps/3/1000)
            that.setData({ allStepsTip: ins })
          }
        }, uid)
      },
    })
  },
  /**
   * 上传步数
   */
  addUserSteps: function (steps) {
    var that = this
    var dates = that.getNowFormatDate()
    var current_date = dates.split(' ')[0]
    wx.getStorage({
      key: 'uid',
      success: function (result) {
        var uid = result.data;
        requestUtil.addUserSteps(function (e) {
          if (e.data.code == '1') {
            // 上传成功
          }
        }, uid, current_date, steps)
      },
    })
  },
  /**
   * 获取星期
   */
  getXingQ: function() {
    var date = new Date();
    var day = date.getDay();
    if (day == 0)
      this.setData({ xingqi: '星期天'})
    else if (day == 1)
      this.setData({ xingqi: '星期一' })
    else if (day == 2)
      this.setData({ xingqi: '星期二' })
    else if (day == 3)
      this.setData({ xingqi: '星期三' })
    else if (day == 4)
      this.setData({ xingqi: '星期四' })
    else if (day == 5)
      this.setData({ xingqi: '星期五' })
    else if (day == 6)
      this.setData({ xingqi: '星期六' }) 
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
    if(month >= 1 && month <= 9) {
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
  strToDate: function(date_str) {
    var d = new Date(Date.parse(date_str.replace(/-/g, "/")));  
    return d;
  },
  addLikeStep: function(ed) {
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
  /**
   * 贵阳天气
   */
  getWeather: function (steps) {
    var that = this
    requestUtil.getWeather(function (e) {
      console.log('guiysnkkjkjkjkjkjjk')
      var dataAr = e.data.weather
      if (dataAr != undefined && dataAr.length > 0) {
        that.setData({ weatherinfo: dataAr[0] })  
      }
    })
  },
  toMoreView: function() {
    wx.navigateTo({
      url: './allrank',
    })
  }

})