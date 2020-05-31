import md5 from './MD5.min.js'

const appid = '20200528000473583'
const key = 'jAl7akvrEIQ2pJcOJtsS'

function translate(q, {
  from = 'auto',
  to = 'auto'
} = {
  from: 'auto',
  to: 'auto'
}) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result){
          resolve(res.data)
        }else{
          reject({status:'error',msg:'翻译失败'})
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
          })
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '请求失败',
          icon: 'none',
        })
      }
    })
  })
}

module.exports.translate = translate