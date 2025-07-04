const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

// Create a connection pool
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute SQL queries
const query = (sql, args) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(sql, args, (err, rows) => {
        connection.release(); // Return the connection to the pool
        if (err) return reject(err);
        resolve(rows);
      });
    });
  });
};

// Complex Model
class Complex {
  constructor(name, capacity, attendance, cost) {
    this.name = name;
    this.capacity = capacity;
    this.attendance = attendance;
    this.cost = cost;
  }

  static async create(newComplex) {
    const sql = "INSERT INTO complexs SET ?";
    try {
      const result = await query(sql, newComplex);
      return { id: result.insertId, ...newComplex };
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    const sql = `SELECT * FROM complexs WHERE id = ${id}`;
    try {
      const rows = await query(sql);
      return rows[0]; // Return the first row if found
    } catch (err) {
      throw err;
    }
  }

  static async findByName(name) {
    const sql = `SELECT * FROM complexs WHERE name = ?`;
    try {
      const rows = await query(sql, [name]);
      return rows[0]; // Return the first row if found
    } catch (err) {
      throw err;
    }
  }

  static async getAll() {
    const sql = "SELECT * FROM complexs";
    try {
      const rows = await query(sql);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async updateById(id, complex) {
    const sql = `UPDATE complexs SET name = ?, capacity = ?, attendance = ?, cost = ? WHERE id = ?`;
    try {
      const result = await query(sql, [complex.name, complex.capacity, complex.attendance, complex.cost, id]);
      return result.affectedRows > 0 ? true : false;
    } catch (err) {
      throw err;
    }
  }

  static async remove(id) {
    const sql = `DELETE FROM complexs WHERE id = ${id}`;
    try {
      const result = await query(sql);
      return result.affectedRows > 0 ? true : false;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Complex;