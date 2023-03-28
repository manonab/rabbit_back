import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenPayload {
  userId: number;
}

export interface AuthRequest extends Request {
  userId?: number;
  user?: { id: number };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  const userId = parseInt(req.query.userId as string, 10);

  if (isNaN(userId)) {
    return res.status(401).json({ message: 'Invalid user ID in query parameters' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'default_secret', (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired access token' });
    }
    const { userId: authenticatedUserId } = payload as TokenPayload;
    if (userId !== authenticatedUserId) {
      return res.status(403).json({ message: 'User ID does not match authenticated user' });
    }
    req.userId = userId;
    next();
  });
}
