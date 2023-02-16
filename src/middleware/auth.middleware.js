const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { PASSWORD_ERROR, USER_NOT_EXIST, UNAUTHORIZATION } = require('../constants/error-types')

const service = require('../service/user.service')
const { md5Password } = require('../util')
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async(ctx, next) =>{

  

  // 2. 判断用户名在数据库中是否存在
    let {name, password} = ctx.request.body;
    let result = await service.getUserByName(name)
    if(result.length > 0){
      let userInfo = result[0]
      let pwd = md5Password(password)
      if(pwd == userInfo.password){
        ctx.user = userInfo
        await next()
      }else{
        return ctx.app.emit('error', new Error(PASSWORD_ERROR), ctx)
      }
    }else{
      return ctx.app.emit('error', new Error(USER_NOT_EXIST), ctx)
    }
  
}

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');

  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}