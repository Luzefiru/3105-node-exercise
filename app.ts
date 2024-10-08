import express from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { rateLimitMiddleware } from './middleware/rateLimitMiddleware';
import { userRouter } from './routes/user';
import bodyParser from 'body-parser';
import { env } from './config/env';

const app = express();

/* Global Middleware */
app.use(rateLimitMiddleware);
app.use(loggerMiddleware);
app.use(bodyParser.json());

/* Routes */
app.use('/', userRouter);

app.listen(env.PORT, () => {
  console.log(`🚀 Server started on port: ${env.PORT}`);
});
