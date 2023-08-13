import express from 'express';
import { getUserInfo } from '../controllers/userControllers.js';
import { auth } from '../moddlewares/auth.js';

const userRouter = express.Router();

userRouter.get('/me', auth, getUserInfo);

export default userRouter;
