const { HOST, USER, PASSWORD, DB } = require('./db');
const { createPool } = require('mysql2');

const pool = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
