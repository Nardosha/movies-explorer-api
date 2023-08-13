import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail.js';

import {
  INVALID_AUTH_DATA_ERROR_TEXT,
  INVALID_EMAIL_ERR_TEXT,
  REQUIRED_EMAIL_ERR_TEXT,
  REQUIRED_PASSWORD_ERR_TEXT,
} from '../constants.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },

  email: {
    type: String,
    required: [true, REQUIRED_EMAIL_ERR_TEXT],
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: INVALID_EMAIL_ERR_TEXT,
    },
  },

  password: {
    type: String,
    required: [true, REQUIRED_PASSWORD_ERR_TEXT],
    select: false,
  },
});

userSchema.statics.findByCredentials = async function ({ email, password }) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthorizedError(INVALID_AUTH_DATA_ERROR_TEXT);
  }

  const isMatchedPassword = await bcrypt.compare(password, user.password);

  if (!isMatchedPassword) {
    throw new UnauthorizedError(INVALID_AUTH_DATA_ERROR_TEXT);
  }

  return user;
};

const User = mongoose.model('user', userSchema);

export default User;
