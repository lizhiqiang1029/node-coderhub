const service = require('../service/user.service')

class UserController {
  async register(ctx, next){
    // 获取传参
    let user = ctx.request.body

    // 数据库操作
    let res = await service.register(user)
    // return result
    ctx.body = res
  }
}


module.exports = new UserController()