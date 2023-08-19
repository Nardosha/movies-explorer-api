import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

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
