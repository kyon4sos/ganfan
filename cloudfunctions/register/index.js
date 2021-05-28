const cloud = require('wx-server-sdk')
const users = require("../dao").users
console.log(users);
const jwt = require('jsonwebtoken');
const security = "abc123"
const createToken = (data) => {
  return jwt.sign({
    data: "123"
  }, security, {
    expiresIn: '7d'
  });
}
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
  // const users = cloud.database().collection("users");
  const wxContext = cloud.getWXContext()
  let data = {}
  let token = null
  let {
    OPENID
  } = wxContext
  let userInfo = event.userInfo
  const dbRes = await users.where({
    _openid: OPENID
  }).get()
  if (dbRes.data.length == 0) {
    const addRes = await users.add({
      data: {
        _openid: OPENID,
        registerTime: new Date().toJSON(),
        ...userInfo
      }
    })
    if (addRes._id) {
      const res = await users.doc(addRes._id)
      token = createToken()
      userInfo = res.data[0]
      data = {
        code: 20000,
        msg: 'success',
        data: res.data[0]
      }
    }
  } else {
    data = {
      code: 20000,
      msg: '已注册',
      userInfo: dbRes.data[0]
    }
  }
  return {
    ...data,
    token
  }
}