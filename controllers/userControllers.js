import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { IntersectionError } from '../errors/IntersectionError.js';
import {
  INTERSECTION_ERROR_TEXT,
  INVALID_AUTH_DATA_ERROR_TEXT,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_USER_ERROR_TEXT,
} from '../constants.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export const signup = async (req, res, next) => {
  try {
    const { name = undefined, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: passwordHash });

    const newUser = { id: user._id, name, email };

    res.status(201).send({ data: newUser });
  } catch (err) {
    if (err.code === 11000) {
      next(new IntersectionError(INTERSECTION_ERROR_TEXT));
      return;
    }

    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials({ email, password });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: 3600000 * 24 * 7,
    });

    res.cookie('token', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });

    const loggedUser = { token, id: user._id, email, name: user.name };

    res.send({ data: loggedUser });
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
    }
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userInfo = req.body;

    const user = await User.findByIdAndUpdate(_id, userInfo, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    const newUser = { id: user._id, name: user.name, email: user.email };

    res.send({ data: newUser });
  } catch (err) {
    if (err.code === 11000) {
      next(new IntersectionError(INTERSECTION_ERROR_TEXT));
      return;
    }

    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie();
    res.send({ data: 'Польщователь успешно разлогинен!' });
  } catch (err) {
    next(err);
  }
};
