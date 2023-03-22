import pool from '../../database';
import express from 'express';
import { FieldPacket, ResultSetHeader } from "mysql2";

const rabbitRouter = express.Router();


rabbitRouter.get("/rabbits", async (req: express.Request, res: express.Response) => {
     const [rows, fields] = await pool.execute("SELECT * FROM rabbits");
     res.json(rows);
   });

rabbitRouter.post('/rabbits', async (req: express.Request, res: express.Response) => {
     try {
          const { name, breeds, user_id, favorite_food_id, image } = req.body;
          const [result, _] : [ResultSetHeader, FieldPacket[]] = await pool.execute(
               "INSERT INTO rabbits (name, breeds, user_id,favorite_food_id, image) VALUES (?, ?, ?, ?, ?)",
               [name, breeds, user_id,favorite_food_id, image]
          );
          res.json({ message: "Rabbit created successfully" });
     } catch(error){
          console.error(error);
          res.status(500).json({message: "Internal server error" })     
     }
})
export default rabbitRouter;