const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.log('Ошибка подключения к БД:', err);
  } else {
    console.log('Сервер установил соединение с PostgreSQL!');
  }
});

module.exports = pool;
