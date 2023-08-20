import express from 'express';
import userRouter from './userRoutes.js';
import movieRouter from './movieRoutes.js';
import { signin, signout, signup } from '../controllers/userControllers.js';
import { auth } from '../moddlewares/auth.js';
import { validateSignin, validateSignup } from '../utils/validators.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { NOT_FOUND_PAGE_ERROR_TEXT } from '../utils/constants.js';

const router = express.Router();

router.use('/signup', validateSignup, signup);
router.use('/signin', validateSignin, signin);
router.delete('/signout', auth, signout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERROR_TEXT));
});

export default router;
