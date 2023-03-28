"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../auth");
const usersRouter = express_1.default.Router();
// Get all users
usersRouter.get("/users", async (req, res) => {
    const [rows, _] = await database_1.default.execute("SELECT * FROM users");
    res.json(rows);
});
usersRouter.get('/home', auth_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(401).json({ message: 'User ID not found in query parameters' });
        }
        const [rabbitResult, _] = await database_1.default.execute("SELECT * FROM rabbits WHERE user_id = ?", [userId]);
        const rabbits = rabbitResult.map(rabbit => ({
            RabbitAge: rabbit.age,
            RabbitBreed: rabbit.breed,
            RabbitFood: rabbit.favorite_food,
            RabbitImage: rabbit.image_path,
            RabbitName: rabbit.name,
            id: rabbit.id
        }));
        res.json({ rabbits });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = usersRouter;
//# sourceMappingURL=index.js.map