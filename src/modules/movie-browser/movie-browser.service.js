//Base Url for fetch
const MOVIE_DB_BASE_URL = 'https://akrp-server.herokuapp.com/';


//Modify Base url according to params passed
const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `${queryParams[paramName]}`);
  }
  return baseUrl;
}

//Fetch all movies from page
// for async action creator helper to work
export const getTopMovies = async ({page}) => {
  const fullUrl = createMovieDbUrl('movies?p=', {
    page
  });
  return fetch(fullUrl);
}

//Fetch all movie details for a specific title
export const getMovieDetails = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`movies/${movieId}`);
  return fetch(fullUrl);
}
