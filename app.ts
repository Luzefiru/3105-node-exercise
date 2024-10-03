import express from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { userRouter } from './routes/user';
import bodyParser from 'body-parser';

const app = express();

/* Global Middleware */
app.use(loggerMiddleware);
app.use(bodyParser.json());

app.get('/', (_, res) => {
  return res.json({ hello: 'world' });
});

/* Routes */
app.use('/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
  console.log(`🚀 Server started on port: ${port}`);
});
