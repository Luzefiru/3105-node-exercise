import express from 'express';
import { register, profile, login } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = express.Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', authMiddleware, profile);

export { userRouter };
