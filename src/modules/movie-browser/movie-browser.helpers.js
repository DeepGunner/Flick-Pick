
const IMAGE_BASE_URL =  `https://image.tmdb.org/t/p/`;

export const updateMoviePictureUrls = (movieResult) => {
  if (movieResult) {
    return {
      ...movieResult,
      backdrop_path: `${IMAGE_BASE_URL}w500/${movieResult.backdrop_path}`,
      poster_path: `${IMAGE_BASE_URL}original/${movieResult.poster_path}`,
    }
  }
  return {};
};


export const getMoviesList = (moviesResponse) => {
  return !!moviesResponse ? ([
    ...moviesResponse.results.map(movieResult => updateMoviePictureUrls(movieResult))
  ]) : null;
}
