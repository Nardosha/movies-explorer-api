import { JWT_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    req.user = await jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {

    console.log(err);
    next(err);
  }
};
