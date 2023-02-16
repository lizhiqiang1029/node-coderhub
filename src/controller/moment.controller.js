class MomentController {
  async create(ctx, next){
    console.log(ctx.user)
    ctx.body = '动态发表成功'
  }
}

module.exports = new MomentController()