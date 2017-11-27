// pages/info/add.js
var util = require('../../utils/util.js');
var app = getApp();
var type = 1;
var id = 0;
Page({
  data: {
  },
  onLoad: function (options) {
    var that = this;
    id = options.id;
    util.req('appointment/detail', { id: options.id, sk: app.globalData.sk }, function (data) {
      
      data.data.time = data.data.leave_time;
      that.setData({ data: data.data });
    })
  },
  formSubmit: function (e) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true
    })
    setTimeout(function(){
      util.req('appointment/submit', { id: id, sk: app.globalData.sk, type: type, form_id: e.detail.formId}, function (data) {
        wx.hideLoading();
        if(data.status){
          if(type == 1){
            wx.showToast({
              title: '拼车成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '拒绝成功',
              icon: 'success',
              duration: 2000
            })
          }
          that.setData({'data.status':type});
        } else {
          util.isError(data.msg, that);
        }
      })
    },1000)
    
  },
  no: function () {
    type = 2;
  }
})