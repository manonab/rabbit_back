"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const authRouter = express_1.default.Router();
authRouter.post('/signin', async (req, res) => {
    // extract email and password from request body
    try {
        const { email, password } = req.body;
        const [result, _] = await database_1.default.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (result.length === 1) {
            // if valid, send success message
            res.status(200).json({ message: 'Sign in successful' });
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
exports.default = authRouter;
//# sourceMappingURL=index.js.map