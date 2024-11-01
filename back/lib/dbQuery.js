const Client = require('pg').Client;
require('dotenv').config();
const ENV = process.env;

async function query (statement, ...args) {
  let result;
  try {
    const dbInstance = new Client({
      host: ENV.DB_ADDR,
      database: ENV.DB,
      user: ENV.DB_USER,
      password: ENV.DB_PASS,
      port: ENV.DB_PORT
    });

    await dbInstance.connect()
    result = await dbInstance.query(statement, args);
    await dbInstance.end();
  } catch (error) {
    console.log(error);
  }
  return result;
}

module.exports = {query};