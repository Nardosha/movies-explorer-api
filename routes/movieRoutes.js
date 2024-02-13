import express from 'express';
import { auth } from '../moddlewares/auth.js';
import { createMovie, deleteMovie, getMovies } from '../controllers/movieControllers.js';
import { validateMovieFields, validateMovieId } from '../utils/validators.js';

const movieRouter = express.Router();

movieRouter.get('/', auth, getMovies);
movieRouter.post('/', auth, validateMovieFields, createMovie);
movieRouter.delete('/:id', validateMovieId, auth, deleteMovie);

export default movieRouter;
