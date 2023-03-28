"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token not found' });
    }
    const userId = parseInt(req.query.userId, 10);
    if (isNaN(userId)) {
        return res.status(401).json({ message: 'Invalid user ID in query parameters' });
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || 'default_secret', (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired access token' });
        }
        const { userId: authenticatedUserId } = payload;
        if (userId !== authenticatedUserId) {
            return res.status(403).json({ message: 'User ID does not match authenticated user' });
        }
        req.userId = userId;
        next();
    });
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=index.js.map