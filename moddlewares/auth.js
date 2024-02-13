import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { UNAUTHORIZED_ERROR_BAD_TOKEN_TEXT, UNAUTHORIZED_ERROR_TEXT } from '../utils/constants.js';

export const auth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_BAD_TOKEN_TEXT));
  }

  let payload;
  try {
    payload = await jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_TEXT));
  }
  req.user = payload
  return next()
};
