import express, { Request, Response, Router } from 'express';
import pool from '../../database';
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

const authRouter: Router = express.Router();

authRouter.post('/signin', async (req: Request, res: Response) => {
  // extract email and password from request body
  try{
       const { email, password } = req.body;
       const [result, _] : [RowDataPacket[], FieldPacket[]] = await pool.execute(
          'SELECT * FROM users WHERE email = ? AND password = ?',
          [email, password]
        );
        
        if (result.length === 1) {
          // if valid, send success message
          res.status(200).json({ message: 'Sign in successful' });
        } else {
          // if invalid, send error message
          res.status(401).json({ message: 'Invalid email or password' });
        }
     }catch(error){
     console.error(error);
     res.status(500).json({message: "Internal server error" })     
     }
  // validate email and password (e.g. check against database)
  
});

export default authRouter;



