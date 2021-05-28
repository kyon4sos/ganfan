// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    OPENID
  } = wxContext
  console.log(wxContext.OPENID, );
  const dbResult = await cloud.database().collection('users').where({
    _openid: OPENID
  }).get()
  let res = {}
  if (dbResult.data.length == 0) {
    res = {
      code: 40002,
      msg: "请登录"
    }
  }
  return {
    ...res,
  }
}