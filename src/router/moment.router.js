const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const momentRouter = new Router({prefix: '/moment'})
const momentController = require('../controller/moment.controller.js')

momentRouter.post('/', verifyAuth, momentController.create)


module.exports = momentRouter