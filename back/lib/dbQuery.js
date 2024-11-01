const Client = require('pg').Client;

async function query (statement, ...args) {
  let result;
  try {
    const dbInstance = new Client({
      host: 'localhost',
      database: 'test1',
      user: 'admin',
      password: '5559',
      port: '5432'
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