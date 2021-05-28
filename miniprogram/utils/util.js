export const func = async (name, data) => {
  console.log("loading");
  wx.showLoading({
    title: '加载中',
  })
  const res = await wx.cloud.callFunction({
    name: name,
    data: data
  })
  wx.hideLoading()
  return res
}