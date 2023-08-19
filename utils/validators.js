import { celebrate, Joi } from 'celebrate';
// import mongoose from 'mongoose';

// const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

export const validateSignup = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
    })
    .unknown(true),
});

export const validateSignin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(true),
});

export const validateUserData = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    })
    .unknown(true),
});
