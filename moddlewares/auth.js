import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { UNAUTHORIZED_ERROR_TEXT } from '../utils/constants.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      next(new UnauthorizedError(UNAUTHORIZED_ERROR_TEXT))
      return
    }

    req.user = await jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    next(err);
  }
};
