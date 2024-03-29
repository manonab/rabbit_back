import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
pool.getConnection().then((connection) => {
  console.log("Connected to database with ID: " + connection.threadId);
  connection.release();
}).catch((err) => {
  console.error("Error connecting to database: " + err.stack);
});

export default pool;