import express from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/userControllers.js';
import { auth } from '../moddlewares/auth.js';
import { validateUserData } from '../utils/validators.js';

const userRouter = express.Router();

userRouter.get('/me', auth, getUserInfo);
userRouter.patch('/me', validateUserData, auth, updateUserInfo);

export default userRouter;
