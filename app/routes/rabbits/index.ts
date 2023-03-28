import pool from '../../database';
import express from 'express';
import { FieldPacket, ResultSetHeader } from "mysql2";

const rabbitRouter = express.Router();


rabbitRouter.get("/rabbits", async (req: express.Request, res: express.Response) => {
     const [rows, fields] = await pool.execute("SELECT * FROM rabbits");
     res.json(rows);
});
export default rabbitRouter;