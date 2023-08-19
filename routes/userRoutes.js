import express from 'express';
import { getUserInfo, signin, signout, signup, updateUserInfo } from '../controllers/userControllers.js';
import { auth } from '../moddlewares/auth.js';
import { validateSignin, validateSignup, validateUserData } from '../utils/validators.js';

const userRouter = express.Router();
userRouter.get('/me', auth, getUserInfo);
userRouter.patch('/me', validateUserData, auth, updateUserInfo);
userRouter.delete('/signout', auth, signout);

export default userRouter;
