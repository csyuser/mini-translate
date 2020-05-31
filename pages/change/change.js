// pages/change/change.js
const app = getApp()

Page({
  data: {
    hideSelectedIcon:true,
    currentLang:{},
    langList:app.globalData.langList
  },
  onShow:function(){
    this.setData({'currentLang':app.globalData.currentLang})
  },
  selectedLang:function(e){
    this.setData({ 'currentLang': e.currentTarget.dataset})
    wx.setStorageSync('currentLang', e.currentTarget.dataset)
    app.globalData.currentLang = e.currentTarget.dataset
    wx.switchTab({url: '/pages/index/index'})
  },
  
})