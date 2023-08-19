import express from 'express';
import { getUserInfo, logout, updateUserInfo } from '../controllers/userControllers';
import { auth } from '../moddlewares/auth';
import { validateUserData } from '../utils/validators';

const userRouter = express.Router();

userRouter.get('/me', auth, getUserInfo);
userRouter.patch('/me', validateUserData, auth, updateUserInfo);
userRouter.delete('/me', auth, logout);

export default userRouter;
