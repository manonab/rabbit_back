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
exports.default = rabbitRouter;
//# sourceMappingURL=index.js.map