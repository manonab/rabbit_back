"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const foodRouter = express_1.default.Router();
foodRouter.get("/food", async (req, res) => {
    const [rows, fields] = await database_1.default.execute("SELECT * FROM food");
    res.json(rows);
});
foodRouter.post('/food', async (req, res) => {
    try {
        const { type, name, icon } = req.body;
        const [result, _] = await database_1.default.execute("INSERT INTO food (type, name, icon) VALUES (?, ?, ?)", [type, name, icon]);
        res.json({ message: "Food created successfully", foodId: result.insertId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = foodRouter;
//# sourceMappingURL=index.js.map