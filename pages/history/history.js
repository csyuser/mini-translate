//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    history: []
  },
  onShow: function() {
    this.setData({'history': wx.getStorageSync('history')})
  },
  onTapHistory: function(e) {
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}&translation=${e.currentTarget.dataset.translation}&currentIndex=${e.currentTarget.dataset.currentlang.index}`,
    })
    
  },
  deleteHistory:function(){
    wx.setStorageSync('history', [])
    this.setData({ 'history': wx.getStorageSync('history') })
  }
})