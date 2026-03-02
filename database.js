const mysql = require("mysql2");

const connDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345", // Asegúrate de que esta sea tu clave de MySQL
  database: "sakila",
});

connDB.connect((error) => {
  if (error) {
    console.log("Error connecting to database: ", error);
  } else {
    console.log("Connected to database successfully!");
  }
});

module.exports = connDB;