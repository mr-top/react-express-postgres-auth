const Client = require('pg').Client;

async function query (statement, ...args) {
  const dbInstance = new Client({
    host: 'localhost',
    database: 'test1',
    user: 'postgres',
    password: '5559',
  });

  await dbInstance.connect()
  const result = await dbInstance.query(statement, args);
  await dbInstance.end();

  return result;
}

module.exports = {query};