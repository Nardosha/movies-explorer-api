import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { signup } from './controllers/userControllers.js';
import { errorHandler } from './moddlewares/errorHandler.js';
import { NotFoundError } from './errors/NotFoundError.js';
import userRouter from './routes/userRoutes.js';
import { PORT, DB_CONNECTION } from './config.js';
import { NOT_FOUND_PAGE_ERROR_TEXT } from './constants.js';

const app = express();

app.use(bodyParser.json());

mongoose.connect(DB_CONNECTION);

app.use('/signup', signup);
app.use('/users', userRouter);

app.use('/*', (err, req, res, next) => {
  res.send(new NotFoundError(NOT_FOUND_PAGE_ERROR_TEXT));
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
