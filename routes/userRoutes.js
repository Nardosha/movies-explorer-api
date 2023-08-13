import express from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/userControllers.js';
import { auth } from '../moddlewares/auth.js';

const userRouter = express.Router();

userRouter.get('/me', auth, getUserInfo);
userRouter.patch('/me', auth, updateUserInfo);

export default userRouter;
