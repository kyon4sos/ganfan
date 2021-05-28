// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const jwt = require('jsonwebtoken');
const security = "abc123"
module.exports.createToken = (data) => {
  return jwt.sign({
    data: "123"
  }, security, {
    expiresIn: '7d'
  });
}
