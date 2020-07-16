// pages/love/love.js
const clone = require('../../utils/clone.js');
const dayjs = require("./dayjs");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    loveList: [],
    isLove: true,
    length: 0,
    placeholder: '暂无收藏单词，快去收藏吧',
  },
  onShow: function() {
    this.getLoveList()
  },

  //获取收藏列表
  getLoveList() {
    const love = clone.clone(wx.getStorageSync('love')).sort((a, b) =>
      dayjs(b.createdAT).valueOf() - dayjs(a.createdAT).valueOf());

    //如果love没有，直接返回
    if (love.length <= 0) {
      this.setData({
        'loveList': [],
        'length': 0
      })
      return
    }

    const result = [{
      title: dayjs(love[0].createdAT).format('YYYY-M-D'),
      datails: [love[0]]
    }];

    for (let i = 1; i <= love.length - 1; i++) {
      const last = result[result.length - 1]
      if (dayjs(love[i].createdAT).isSame(last.title, 'day')) {
        last.datails.push(love[i])
      } else {
        result.push({
          title: dayjs(love[i].createdAT).format('YYYY-M-D'),
          datails: [love[i]]
        })
      }
    }


    this.setData({
      'loveList': result,
      'length': love.length,
    })
  },
  // 删除收藏
  changeLove(e) {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确定删除收藏？',
      success(res) {
        if (res.confirm) {
          const newLoveList = clone.clone(wx.getStorageSync('love'))
          newLoveList.map((item, index) => {
            if (item.id === e.currentTarget.dataset.loveid) {
              newLoveList.splice(index, 1)
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
          wx.setStorageSync('love', newLoveList)
          _this.getLoveList()
        } else if (res.cancel) {
          wx.showToast({
            title: '取消删除',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //点击跳转到翻译页面
  onTapLove: function(e) {
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}&translation=${e.currentTarget.dataset.translation}&currentIndex=${e.currentTarget.dataset.currentlang.index}&isLove=${e.currentTarget.dataset.islove}`,
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})