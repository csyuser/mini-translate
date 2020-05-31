//index.js
//获取应用实例
const app = getApp()
const translate = require('../../utils/api.js')

Page({
  data: {
    hideClearIcon: true,
    query: '',
    result: [],
    currentLang:{}
  },
  onLoad: function (options){
    if(options){
      let a = [{query:'',dst:''}]
      a[0].dst = options.translation
      app.globalData.langList.map(item=>{
        if(item.index === parseFloat(options.currentIndex)){
          app.globalData.currentLang = item
        }
      })
      this.setData({'query': options.query })
      this.setData({ 'result': a})
    }
  },
  onShow:function(){
    this.setData({'currentLang':app.globalData.currentLang})
    if (!this.data.query) return
    this.clearIcon()

  },
  clearIcon:function(){
    if (this.data.query.length > 0) {
      this.setData({ 'hideClearIcon': false })
    } else (
      this.setData({ 'hideClearIcon': true })
    )
  },
  inputClear: function() {
    this.setData({
      'hideClearIcon': true,
      'query': '',
      result: []
    })
  },
  onInput: function(e) {
    this.setData({'query': e.detail.value})
    this.clearIcon()
  },
  onConfirm: function() {
    if (!this.data.query) return
    translate.translate(this.data.query, {from: 'auto', to: this.data.currentLang.lang}).then(res => {
      this.setData({"result": res.trans_result})
      const history = wx.getStorageSync('history') || []
      console.log(this.data.currentLang)
      history.unshift({
        query: res.trans_result[0].src,
        translation: res.trans_result[0].dst,
        langSelect: this.data.currentLang
      })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  }
})