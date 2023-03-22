"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersRouter = express_1.default.Router();
// Get all users
usersRouter.get("/users", async (req, res) => {
    const [rows, fields] = await database_1.default.execute("SELECT * FROM users");
    res.json(rows);
});
// Create a new user
usersRouter.post("/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Insert the new user into the database
        const [result, _] = await database_1.default.execute("INSERT INTO users (name, email, password) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT * FROM users WHERE email = ?)", [name, email, hashedPassword, email]);
        // Create and sign the access token
        const accessToken = jsonwebtoken_1.default.sign({ userId: result.insertId }, process.env.ACCESS_TOKEN_SECRET ?? 'default_secret');
        if (result.affectedRows === 0) {
            // If no rows were affected, it means a user with the same email already exists
            return res.status(400).json({ message: "Email address is already in use" });
        }
        else {
            res.json({ userId: result.insertId, accessToken });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = usersRouter;
//# sourceMappingURL=index.js.map