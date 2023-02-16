const Router = require('koa-router')

const userRouter = new Router({prefix: '/users'})
const userController = require('../controller/user.controller')
const userMiddleWare = require('../middleware/user.middleware')

userRouter.post('/',userMiddleWare.formPattern, userMiddleWare.verifyUser, userMiddleWare.encryptPwd, userController.register)

module.exports = userRouter