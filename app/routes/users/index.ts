import pool from "../../database";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { FieldPacket, ResultSetHeader } from "mysql2";

const usersRouter = express.Router();

// Get all users
usersRouter.get("/users", async (req: express.Request, res: express.Response) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");
  res.json(rows);
});

// Create a new user
usersRouter.post("/users", async (req: express.Request, res: express.Response) => {
  try {
       const { name, email, password } = req.body;
       
       // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
       // Insert the new user into the database
       const [result, _] : [ResultSetHeader, FieldPacket[]] = await pool.execute(
          "INSERT INTO users (name, email, password) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT * FROM users WHERE email = ?)",
          [name, email, hashedPassword, email]
       );
       // Create and sign the access token
       const accessToken = jwt.sign({ userId: result.insertId }, process.env.ACCESS_TOKEN_SECRET ?? 'default_secret');
       
       if (result.affectedRows === 0) {
          // If no rows were affected, it means a user with the same email already exists
          return res.status(400).json({ message: "Email address is already in use" });
        }else {
             res.json({userId: result.insertId, accessToken });
        }
  } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Internal server error" });
   }
});

export default usersRouter;
