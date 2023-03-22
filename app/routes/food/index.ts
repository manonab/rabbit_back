import express from "express";
import pool from '../../database';
import { FieldPacket, ResultSetHeader } from "mysql2";

const foodRouter = express.Router();

foodRouter.get("/food", async (req: express.Request, res: express.Response) => {
     const [rows, fields] = await pool.execute("SELECT * FROM food");
     res.json(rows);
   });

   foodRouter.post('/food', async (req: express.Request, res: express.Response) => {
     try {
          const { type, name, icon } = req.body;
          const [result, _] : [ResultSetHeader, FieldPacket[]] = await pool.execute(
               "INSERT INTO food (type, name, icon) VALUES (?, ?, ?)",
               [type, name, icon]
          );
          res.json({ message: "Food created successfully", foodId: result.insertId });
     } catch(error){
          console.error(error);
          res.status(500).json({message: "Internal server error" })     
     }
})
export default foodRouter;