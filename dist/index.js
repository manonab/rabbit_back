"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const rabbits_1 = __importDefault(require("./routes/rabbits"));
const food_1 = __importDefault(require("./routes/food"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(users_1.default);
app.use(rabbits_1.default);
app.use(food_1.default);
app.use(auth_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map