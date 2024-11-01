const db = require('./dbQuery.js');
const bcrypt = require('bcrypt');

class PostgresSession {
  constructor(){

  }

  async register(newUsername, newPassword){
    const hashedPassword = await bcrypt.hash(newPassword, 1);
    const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', newUsername, hashedPassword);
    if (result && result.rowCount > 0) {
      return {text: 'Register complete'}
    } else {
      return {text: 'Register is not complete'}
    }
  }

  async login(username, password, req){
    const result = await db.query('SELECT * FROM users WHERE username = $1', username);
    if (result && result.rowCount > 0) {
      if (await bcrypt.compare(password, result.rows[0].password)) {
        req.session.user = result.rows[0].username;
        return {text: 'Logged in correctly'};
      } else {
        return {text: 'Password is not correct'};
      }
    } else {
      return {text: 'Username is not found'}
    }
  }
}

module.exports = PostgresSession;