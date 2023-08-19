import Movie from '../models/movie.js';
import {
  DELETE_MOVIE_FORBIDDEN_ERROR_TEXT,
  NOT_FOUND_MOVIE_ERROR_TEXT,
} from '../utils/constants.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';
import { BadRequestError } from '../errors/BadRequestError.js';

export const createMovie = async (req, res, next) => {
  try {
    const movieData = req.body;

    const { _id } = req.user;

    const movie = await Movie.create({ ...movieData, owner: _id });

    res.status(201).send({ data: movie });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errorMessage = Object.values(err.errors).map(error => error.message).join(', ')
      next(new BadRequestError(errorMessage));
      return;
    }

    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id: movieId } = req.params;
    const { _id: userId } = req.user;

    const movie = await Movie.findOne({ movieId });

    if (!movie) {
      next(new NotFoundError(NOT_FOUND_MOVIE_ERROR_TEXT));
    }

    const isOwner = movie.owner.toString() === userId;

    if (!isOwner) {
      return next(new ForbiddenError(DELETE_MOVIE_FORBIDDEN_ERROR_TEXT));
    }

    const deletedMovie = await Movie.findByIdAndDelete(movie._id);

    res.send({ data: deletedMovie });
  } catch (err) {
    next(err);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const movies = await Movie.find({ owner });

    res.send({ data: movies });
  } catch (err) {
    next(err);
  }
};
