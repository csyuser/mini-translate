//index.js
//获取应用实例
const app = getApp()
const translate = require('../../utils/api.js')
const createId = require('../../utils/createId.js')

Page({
  data: {
    hideClearIcon: true,
    query: '',
    result: [],
    currentLang: {},
    hideLoveIcon: true,
    isLove: false,
    translation: '',
    isLoved:false,
  },
  onLoad: function(options) {
    if (options) {
      let a = [{
        query: '',
        dst: ''
      }]
      a[0].dst = options.translation
      app.globalData.langList.map(item => {
        if (item.index === parseFloat(options.currentIndex)) {
          app.globalData.currentLang = item
        }
      })
      this.setData({
        'query': options.query ? options.query:'',
        'translation': options.translation ? options.translation:'',
        'isLove': options.isLove === 'true' ? true : false,
      })
      this.setData({
        'result': a
      })
    }
  },
  onShow: function() {
    this.setData({
      'currentLang': app.globalData.currentLang
    })
    if (!this.data.query) return
    this.clearIcon()
    this.loveIcon()
    this.alreadyLoved()

  },
  //清空输入内容图标的展示
  clearIcon: function() {
    if (this.data.query.length > 0) {
      this.setData({
        'hideClearIcon': false
      })
    } else(
      this.setData({
        'hideClearIcon': true,
        'hideLoveIcon': true,
        'isLove': false,
      })
    )
  },
  //收藏的展示切换
  loveIcon: function() {
    if (this.data.translation.length > 0 && this.data.query.length > 0) {
      this.setData({
        'hideLoveIcon': false
      })
    } else(
      this.setData({
        'hideLoveIcon': true
      })
    )
  },
  //清空输入，输出内容
  inputClear: function() {
    this.setData({
      'hideClearIcon': true,
      'hideLoveIcon': true,
      'query': '',
      'isLove': false,
      'translation':'',
      result: []
    })
  },
  //输入事件
  onInput: function(e) {
    this.setData({
      'query': e.detail.value,
      translation:'',
      result: []
    })
    this.alreadyLoved()
    this.clearIcon()
    this.loveIcon()
  },
  //点击翻译按钮翻译
  onConfirm: function() {
    wx.showLoading({
      title: '正在翻译',
    })
    if (!this.data.query) return

    translate.translate(this.data.query, {
      from: 'auto',
      to: this.data.currentLang.lang
    }).then(res => {
      this.setData({
        "result": res.trans_result,
        'query': res.trans_result[0].src,
        'translation': res.trans_result[0].dst
      })
      wx.hideLoading()
      this.alreadyLoved()
      this.loveIcon()
      this.getHistory()
    })
  },
  //保存历史翻译列表，限制十条
  getHistory() {
    const history = wx.getStorageSync('history') || []
    const currentTime = ''
    const id = 0
    history.unshift({
      query: this.data.query,
      translation: this.data.translation,
      langSelect: this.data.currentLang,
      isLove: this.data.isLove,
      createdAT: new Date().toISOString(),
      id: createId.createId(),
    })
    history.length = history.length > 10 ? 10 : history.length
    wx.setStorageSync('history', history)
  },
  //保存收藏列表
  saveLove() {
    const love = wx.getStorageSync('love') || []
    const currentTime = ''
    const id = 0
    love.unshift({
      query: this.data.query,
      translation: this.data.translation,
      langSelect: this.data.currentLang,
      isLove: this.data.isLove,
      createdAT: new Date().toISOString(),
      id: createId.createId(),
    })
    wx.setStorageSync('love', love.filter(item => item.isLove === true))
  },
//判断是否已经收藏
  alreadyLoved(){
    this.setData({ 'isLove': false })
    const loveList = wx.getStorageSync('love')
    loveList.map(item => {
      if (this.data.query === item.query && this.data.currentLang.index === item.langSelect.index) {
        this.setData({'isLove':true})
      }
    })
  },
  //添加收藏
  addLove() {
    if (!this.data.translation || !this.data.query) return
    const loveList = wx.getStorageSync('love')
    if (this.data.isLove === true) {
      loveList.map(item => {
        if (this.data.query === item.query && this.data.currentLang.index === item.langSelect.index) {
          loveList.splice(item.index, 1)
          wx.setStorageSync('love', loveList)
        }
      })
      this.setData({
        'isLove': false
      })
    } else {
      this.setData({
        'isLove':true
      })
      this.saveLove()
    }
  },
})