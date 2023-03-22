"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.get("/users", async (req, res) => {
    const [rows, fields] = await database_1.default.execute("SELECT * FROM users");
    res.json(rows);
});
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
//# sourceMappingURL=index.js.map