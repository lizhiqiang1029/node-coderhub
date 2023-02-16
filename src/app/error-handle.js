const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message
  switch(error.message){
    case errorTypes.USERNAME_IS_ALREADY_EXIST:
      status = 409;
      message = '用户名已经存在'
      break;

    case errorTypes.PASSWORD_ERROR:
      status = 403;
      message = '用户名或密码错误'
      break;
    
    case errorTypes.USER_NOT_EXIST:
      status = 403;
      message = '用户名不存在'
      break;

    case errorTypes.UNAUTHORIZATION:
      status = 401; // 参数错误
      message = "无效的token~";
      break;
    
    default:
      status = 500;
      message = 'Serve Error'
  }

  ctx.status = status;
  ctx.body = message
}

module.exports = errorHandler