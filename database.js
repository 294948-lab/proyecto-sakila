require('dotenv').config();
const mysql = require("mysql2");

const connDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connDB.connect((error) => {
  if (error) {
    console.log("Error connecting to database: ", error);
  } else {
    console.log("Connected to database successfully!");
  }
});

module.exports = connDB;