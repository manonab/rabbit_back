"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
// Get all users
usersRouter.get("/users", async (req, res) => {
    const [rows, _] = await database_1.default.execute("SELECT * FROM users");
    res.json(rows);
});
exports.default = usersRouter;
//# sourceMappingURL=index.js.map