import {
  INTERNAL_SERVER_ERROR_CODE,
  INTERNAL_SERVER_ERROR_TEXT,
} from '../constants.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR_CODE;
  const errorMessage =
    err.code === INTERNAL_SERVER_ERROR_CODE
      ? INTERNAL_SERVER_ERROR_TEXT
      : err.message;

  res.status(statusCode).send({ code: statusCode, message: errorMessage });
  next();
};
