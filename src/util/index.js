const crypto = require('crypto')

// 密码加密函数
const md5Password = (pwd) =>{
  const md5 = crypto.createHash('md5')
  const result = md5.update(pwd).digest('hex')
  return result
}

module.exports = {
  md5Password
}