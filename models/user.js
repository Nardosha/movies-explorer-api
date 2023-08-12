import mongoose from 'mongoose';
import isEmail from 'validator/es/lib/isEmail.js';
import {
  INVALID_EMAIL_ERR_TEXT,
  REQUIRED_EMAIL_ERR_TEXT,
  REQUIRED_PASSWORD_ERR_TEXT,
} from '../constants.js';

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

const User = mongoose.model('user', userSchema);

export default User;
