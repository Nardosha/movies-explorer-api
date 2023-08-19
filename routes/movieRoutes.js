import express from 'express';
import { auth } from '../moddlewares/auth';
import { createMovie, deleteMovie, getMovies } from '../controllers/movieControllers';

const movieRouter = express.Router();

movieRouter.get('/', auth, getMovies);
movieRouter.post('/', auth, createMovie);
movieRouter.delete('/:id', auth, deleteMovie);

export default movieRouter;
