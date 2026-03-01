import mysql from "mysql2/promise";

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: parseInt(process.env.DB_PORT || "3306"),
  password: "Hesoyam.1",
  database: process.env.DB_NAME || "popsip",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection function
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(" Database connected successfully!");
    connection.release();
    return true;
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    return false;
  }
}

// Helper function for queries
async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Helper for single row
async function queryOne(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results[0];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export { pool, testConnection, query, queryOne };
