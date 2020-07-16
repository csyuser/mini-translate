//logs.js

Page({
  data: {
    history: [],
    placeholder:'暂无翻译历史'
  },
  onShow: function() {
    this.setData({'history': wx.getStorageSync('history')})
  },
  onTapHistory: function(e) {
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}&translation=${e.currentTarget.dataset.translation}&currentIndex=${e.currentTarget.dataset.currentlang.index}`,
    })
    
  },
//清空历史
  deleteHistory:function(){
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确定清空历史记录？',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('history', [])
          _this.setData({ 'history': wx.getStorageSync('history') })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消删除',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    
  }
})