const Joi = require('joi')
const service = require('../service/user.service')
const errorType = require('../constants/error-types')
const {md5Password} = require('../util/index')
class UserMiddleWare{
async formPattern(ctx, next){
  // 1. 校验用户名密码格式是否符合要求
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
  }).validate(ctx.request.body, {allowUnknown: true})
  if(schema.error){
    ctx.throw(400, schema.error)
  }else{
    await next()
  }
}

  async verifyUser(ctx, next){
    

    let {name} = ctx.request.body
    // 2. 判断用户名是否被注册过
    let result = await service.getUserByName(name)
    console.log(result.length);
    if(result.length > 0){
      // ctx.throw(400, new Error('用户名已存在'))
      return ctx.app.emit('error', new Error(errorType.USERNAME_IS_ALREADY_EXIST) , ctx)
    }

    await next()
  }

  async encryptPwd(ctx, next){
    let {password} = ctx.request.body;
    ctx.request.body.password = md5Password(password)

    await next()
  }
}

module.exports = new UserMiddleWare()