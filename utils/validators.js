import { celebrate, Joi } from 'celebrate';
import mongoose from 'mongoose';
// import mongoose from 'mongoose';

const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

export const validateSignup = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    })
});

export const validateSignin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
});

export const validateUserData = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    })
});

export const validateMovieFields = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(URL_PATTERN),
      trailerLink: Joi.string().required().regex(URL_PATTERN),
      thumbnail: Joi.string().required().regex(URL_PATTERN),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    })
});

export const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.number().required()
  })
});