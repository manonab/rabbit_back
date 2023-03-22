"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const express_1 = __importDefault(require("express"));
const rabbitRouter = express_1.default.Router();
rabbitRouter.get("/rabbits", async (req, res) => {
    const [rows, fields] = await database_1.default.execute("SELECT * FROM rabbits");
    res.json(rows);
});
rabbitRouter.post('/rabbits', async (req, res) => {
    try {
        const { name, breeds, user_id, favorite_food_id, image } = req.body;
        const [result, _] = await database_1.default.execute("INSERT INTO rabbits (name, breeds, user_id,favorite_food_id, image) VALUES (?, ?, ?, ?, ?)", [name, breeds, user_id, favorite_food_id, image]);
        res.json({ message: "Rabbit created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = rabbitRouter;
//# sourceMappingURL=index.js.map