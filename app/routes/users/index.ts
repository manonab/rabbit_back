import pool from "../../database";
import express, { Request, Response, Router } from 'express';


const usersRouter: Router  = express.Router();

// Get all users
usersRouter.get("/users", async (req: Request, res:Response) => {
  const [rows, _] = await pool.execute("SELECT * FROM users");
  res.json(rows);
});

export default usersRouter;
