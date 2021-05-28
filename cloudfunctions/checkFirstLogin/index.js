// 云函数入口文件
const cloud = require('wx-server-sdk')
const users = require('../dao').users
console.log(users);
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    OPENID
  } = wxContext
  const dbRes = await users.where({
    _openid: OPENID
  }).get()
  let res = {}
  let userInfo = null
  let token = null
  console.log(dbRes);
  if (dbRes.data.length == 0) {
    res = {
      code: 20001,
      msg: 'firsLogin'
    }
  } else {
    res = {
      code: 20000,
      msg: 'success'
    }
    userInfo = dbRes.data[0]
  }
  return {
    ...res,
    userInfo
  }
}