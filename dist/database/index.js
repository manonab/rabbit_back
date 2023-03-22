"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
exports.default = pool;
//# sourceMappingURL=index.js.map