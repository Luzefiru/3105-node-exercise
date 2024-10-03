import express from 'express';
import { register, profile } from '../controllers/userController';

const userRouter = express.Router();
userRouter.get('/profile', profile);
userRouter.post('/register', register);

export { userRouter };
