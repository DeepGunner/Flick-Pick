import React from 'react';
import {connect} from 'react-redux';
import { Dialog } from 'material-ui';
import _ from 'lodash';
import { closeMovieModal } from './movie-modal.actions';
import { getMovieDetails } from '../movie-browser.actions';
import * as movieHelpers from '../movie-browser.helpers';
import Loader from '../../common/loader.component';

const styles = {
  // Can use functions to style components
  dialogContent: (backgroundUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 400,
    color: 'white',
    padding: 10
  }),

  loaderColor:{
    loadingColor:"red"
  }
}

class MovieModalContainer extends React.Component {
  // Triggered right after a property is changed
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.getMovieDetails(nextProps.movieId);
    }
  }

  render() {
    const {isOpen, closeMovieModal, isLoading} = this.props;
    const movie = movieHelpers.updateMoviePictureUrls(this.props.movie);
    
    return (
      
      <Dialog
        autoScrollBodyContent={true}
        title={null}
        modal={false}
        open={isOpen}
        onRequestClose={closeMovieModal}
      >
        <Loader style={styles.loaderColor} isLoading={isLoading}>
          <div style={styles.dialogContent(movie.poster_path)}>
          
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Budget: ${movie.budget}</p>
            <p>Revenue: ${movie.revenue}</p>
          </div>
        </Loader>
    </Dialog>
    );
  }
}
// "connect" our movie modal to the component store
export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    
    // Using lodash get, recursively check that a property is defined
    isOpen: _.get(state, 'movieBrowser.movieModal.isOpen', false),
    movieId: _.get(state, 'movieBrowser.movieModal.movieId'),
    movie: _.get(state, 'movieBrowser.movieDetails.response[0]', {}),
    isLoading: _.get(state, 'movieBrowser.movieDetails.isLoading', false),
  }),
  // Map an action to a prop, ready to be dispatched
  { closeMovieModal, getMovieDetails }
)(MovieModalContainer);
