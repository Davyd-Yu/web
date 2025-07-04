const mysql = require("mysql2");

const pool = mysql.createPool({
  user: "root",       
  password: "023456789kr",   
  host: "127.0.0.1",  
  port: 3306,         
  database: "plants_shop",  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;
