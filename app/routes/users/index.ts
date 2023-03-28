import pool from "../../database";
import express, { Request, Response, Router } from 'express';
import { FieldPacket, RowDataPacket } from "mysql2";
import { authenticateToken, AuthRequest } from "../../auth";

const usersRouter: Router  = express.Router();

// Get all users
usersRouter.get("/users", async (req: Request, res:Response) => {
  const [rows, _] = await pool.execute("SELECT * FROM users");
  res.json(rows);
});

usersRouter.get('/home', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in query parameters' });
    }

    const [rabbitResult, _] : [RowDataPacket[], FieldPacket[]] = await pool.execute(
      "SELECT * FROM rabbits WHERE user_id = ?",
      [userId]
    );

    const rabbits = rabbitResult.map(rabbit => ({
      RabbitAge: rabbit.age,
      RabbitBreed: rabbit.breed,
      RabbitFood: rabbit.favorite_food,
      RabbitImage: rabbit.image_path,
      RabbitName: rabbit.name,
      id: rabbit.id
    }));

    res.json({ rabbits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default usersRouter;
