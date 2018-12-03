import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row} from 'react-bootstrap';
import {AppBar} from 'material-ui';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';

const styles = {
  body:{
    backgroundColor: "#000000"
  }
};

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: []
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  //Load next page when 80% of currebt content has been scrolled 
  handleScroll() {
    const {topMovies} = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.setState({currentPage: nextPage});
      }
    }
  }

  render() {
    const {topMovies} = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);

    return (
      <div>
        <AppBar title='Flick Pick'
        showMenuIconButton = 'false' 
        style={{backgroundColor: "#FF9800",textAlign:"center"}}
        />
        <Grid>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading} />
          </Row>
        </Grid>
        <MovieModal />
      </div>
    );
  }
}

export default connect(
  
  (state) => ({
    topMovies: state.movieBrowser.topMovies
  }),
  
  { ...movieActions }
)(MovieBrowser);
