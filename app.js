import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { signin, signup } from './controllers/userControllers';
import { errorHandler } from './moddlewares/errorHandler';
import { NotFoundError } from './errors/NotFoundError';
import userRouter from './routes/userRoutes';
import movieRouter from './routes/movieRoutes';
import { PORT, DB_CONNECTION } from './config';
import { NOT_FOUND_PAGE_ERROR_TEXT } from './utils/constants';
import { validateSignin, validateSignup } from './utils/validators';
import { errorLogger, requestLogger } from './moddlewares/logger';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(DB_CONNECTION);
app.use(requestLogger);
app.use('/signup', validateSignup, signup);
app.use('/signin', validateSignin, signin);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERROR_TEXT));
});

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
