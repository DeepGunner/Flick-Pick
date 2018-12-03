import {combineReducers} from 'redux';
import { createAsyncReducer } from '../common/redux.helpers';
import { keys as movieActionKeys } from './movie-browser.actions';
import movieModalReducer from './movie-modal/movie-modal.reducer';

// This will create a new state with both the existing 
// movies and new pages of movies
const moviesSuccessReducer = (state, action) => {
  const existingMovies = state.response ? state.response.results : [];
  // Create a new state object to be returned
  
  return {
    ...state,
    isLoading: false,
    response: {
      ...action.response,
      results: [
        ...existingMovies,
        ...action.response
      ]
    }
  };
}

const movieBrowserReducer = combineReducers({
  movieModal: movieModalReducer,
  topMovies: createAsyncReducer(movieActionKeys.GET_TOP_MOVIES, {
    [`${movieActionKeys.GET_TOP_MOVIES}_SUCCESS`]: moviesSuccessReducer
  }),
  movieDetails: createAsyncReducer(movieActionKeys.GET_MOVIE_DETAILS),
});

export default movieBrowserReducer;
