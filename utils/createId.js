let id = parseInt(wx.getStorageSync('_idMax') || '0') || 0;

function createId() {
  id++;
  wx.setStorageSync('_idMax', id.toString())
  return id;
}

module.exports.createId = createId;