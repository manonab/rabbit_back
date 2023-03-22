import express from "express";
import pool from './database';
const app = express();

app.get("/users", async (req: express.Request, res: express.Response) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");
  res.json(rows);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});