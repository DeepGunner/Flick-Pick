import {createAsyncActionCreator} from '../common/redux.helpers';
import * as movieService from './movie-browser.service';

export const keys = {
  'GET_TOP_MOVIES': 'GET_TOP_MOVIES',
  'GET_MOVIE_DETAILS': 'GET_MOVIE_DETAILS',
};

export const getTopMovies = (page) => createAsyncActionCreator(
  // actionType
  keys.GET_TOP_MOVIES,
  // requestFn
  movieService.getTopMovies, 
  // requestParams
  {page}
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
  keys.GET_MOVIE_DETAILS,
  movieService.getMovieDetails, 
  {movieId}
);
