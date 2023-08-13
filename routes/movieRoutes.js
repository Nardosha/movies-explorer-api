import express from 'express';
import { auth } from '../moddlewares/auth.js';
import { getMovies } from '../controllers/movieControllers.js';

const movieRouter = express.Router();

movieRouter.get('/', auth, getMovies);

export default movieRouter;
