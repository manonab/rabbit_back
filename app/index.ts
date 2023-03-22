import express from 'express';
import foodRouter from './routes/food';
import rabbitRouter from './routes/rabbits';
import usersRouter from './routes/users';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(usersRouter);
app.use(rabbitRouter);
app.use(foodRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});