import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from "helmet";
import router from './routes/index.js';
import limiter from './moddlewares/limiter.js';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { errorHandler } from './moddlewares/errorHandler.js';
import { PORT, DB_CONNECTION } from './config.js';
import { errorLogger, requestLogger } from './moddlewares/logger.js';

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(limiter)

app.use(helmet());

mongoose.connect(DB_CONNECTION);

app.use(router);

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
