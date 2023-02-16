const fs = require('fs')

const useRoutes = function(){
  let arr = fs.readdirSync(__dirname)
  console.log(arr);
  arr.forEach(file => {
    if(file == 'index.js') return;
    let router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = useRoutes