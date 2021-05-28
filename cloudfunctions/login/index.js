const cloud = require('wx-server-sdk')
const users = require('../dao').users
const utils = require('../util')
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let data = null
  let token = null
  let {
    OPENID
  } = wxContext
  const dbRes = await users.where({
    _openid: OPENID
  }).get()
  token = utils.createToken()
  if (dbRes.data.length == 0) {
    data = {
      code: 40000,
      msg: "用户不存在"
    }
  } else {
    data = {
      code: 20000,
      msg: "success",
      userInfo: dbRes.data[0]
    }
  }
  return {
    ...codeMsg,
    token,
  }
}