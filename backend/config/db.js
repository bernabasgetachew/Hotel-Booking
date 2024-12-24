
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();  // This should be called at the top of the file


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

module.exports = db;
