const {PRIVATE_KEY} = require('../app/config')

const JWT = require('jsonwebtoken')



class AuthController{
  async login(ctx, next) {
    let {id, name} = ctx.user;
    let promise = new Promise((resolve, reject) => {
      JWT.sign({id, name}, PRIVATE_KEY, {
        expiresIn:50 * 1000,
        algorithm: 'RS256'
      }, (err, token) => {
        
        if(err) throw err;
        resolve(token)
      })    
    })
    let token = await promise;
    ctx.body = {id, name, token}
  }

  async success(ctx, next){
    ctx.body = '验证成功'
  }
}

module.exports = new AuthController()