"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const authRouter = express_1.default.Router();
authRouter.post('/signin', async (req, res) => {
    // extract email and password from request body
    try {
        const { email, password } = req.body;
        const [result, _] = await database_1.default.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (result.length === 1) {
            const user = result[0];
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET ?? 'default_secret');
            const passwordMatch = await bcrypt_1.default.compare(password, user.password);
            if (passwordMatch) {
                // if valid, send success message
                res.status(200).json({ message: 'Sign in successful', user_id: user.id, user_token: accessToken });
            }
            else {
                // if invalid, send error message
                res.status(401).json({ message: 'Invalid email or password' });
            }
            // if valid, send success message
        }
        else {
            // if invalid, send error message
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    // validate email and password (e.g. check against database)
});
authRouter.post("/sign_up", async (req, res) => {
    try {
        const { name, email, password, rabbitName, rabbitAge, rabbitBreed, rabbitFood, rabbitImage } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Insert the new user into the database
        const [userResult, _] = await database_1.default.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        const userId = userResult.insertId;
        // Create a new rabbit for the user and insert it into the database
        const [rabbitResult, __] = await database_1.default.execute("INSERT INTO rabbits (name, age, breed, favorite_food, user_id, is_displayed, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)", [rabbitName, rabbitAge, rabbitBreed, rabbitFood, userId, true, rabbitImage]);
        // Link the user and rabbit in the user_rabbit table
        const [userRabbitResult, ___] = await database_1.default.execute("INSERT INTO user_rabbit (user_id, rabbit_id) VALUES (?, ?)", [userResult.insertId, rabbitResult.insertId]);
        // Create and sign the access token
        const accessToken = jsonwebtoken_1.default.sign({ userId: userResult.insertId }, process.env.ACCESS_TOKEN_SECRET ?? 'default_secret');
        res.json({ userId: userResult.insertId, accessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = authRouter;
//# sourceMappingURL=index.js.map