const connection = require('../app/database')

class UserService{
  async register(user){
    const {name, password} = user;
    let statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [name, password])
    return result[0]
  }

  async getUserByName(name){
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new UserService()