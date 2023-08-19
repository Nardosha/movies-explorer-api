import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { errorHandler } from './moddlewares/errorHandler.js';
import { PORT, DB_CONNECTION } from './config.js';
import { errorLogger, requestLogger } from './moddlewares/logger.js';
import router from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(DB_CONNECTION);
app.use(requestLogger);

app.use(router);

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
