const { APP_PORT } = require('./app/config')
require('./app/database')
const app = require('./app')
app.listen(APP_PORT, ()=>{
  console.log('服务器在  ' +APP_PORT+' 启动成功');
})

