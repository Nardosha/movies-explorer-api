import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { signin, signup } from './controllers/userControllers.js';
import { errorHandler } from './moddlewares/errorHandler.js';
import { NotFoundError } from './errors/NotFoundError.js';
import userRouter from './routes/userRoutes.js';
import movieRouter from './routes/movieRoutes.js';
import { PORT, DB_CONNECTION } from './config.js';
import { NOT_FOUND_PAGE_ERROR_TEXT } from './constants.js';
import { validateSignin, validateSignup } from './utils/validators.js';
import { errors } from 'celebrate';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(DB_CONNECTION);

app.use('/signup', validateSignup, signup);
app.use('/signin', validateSignin, signin);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERROR_TEXT));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
