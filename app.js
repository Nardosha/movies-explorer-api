import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { errors } from 'celebrate';
import router from './routes/index.js';
import limiter from './moddlewares/limiter.js';
import { errorHandler } from './moddlewares/errorHandler.js';
import { PORT, DB_CONNECTION } from './config.js';
import { errorLogger, requestLogger } from './moddlewares/logger.js';
import { corsOptions } from './utils/constants.js';

const app = express();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);

app.use(helmet());
app.use(cors(corsOptions))

mongoose.connect(DB_CONNECTION);

app.use(router);

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
