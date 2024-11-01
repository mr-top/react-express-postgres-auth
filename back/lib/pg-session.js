const db = require('./dbQuery.js');

class PostgresSession {
  constructor(){

  }

  async register(newUsername, newPassword){
    await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', newUsername, newPassword);
  }
}

module.exports = PostgresSession;