import React from 'react';
import './styles/main_movie_list.scss';
import ArtistList from './ArtistList';

const moviesData = [
  {
    id: 12,
    movieTitle: "The 400 Blows",
    movieDirector: "Kim Ki-young"
  }, {
    id: 23,
    movieTitle: "The Ballad of Narayama",
    movieDirector: "Keisuke Kinoshita"
  }, {
    id: 34,
    movieTitle: "Being John Malkovich",
    movieDirector: "Spike Jonze"
  }, {
    id: 45,
    movieTitle: "Deliverance",
    movieDirector: "John Boorman"
  }
];

const artistsData = [
  {
    id: 1,
    name: "Bong Joon Ho"
  }, {
    id: 2,
    name: "Stanley Kubrick"
  }, {
    id: 3,
    name: "Bill Hader"
  }
];

const source = [
  {
    id: 1,
    source_link: "https://nofilmschool.com/bill-hader-best-movies-list",
    source: "No Film School"
  },
  {
    id: 2,
    source_link: "https://www.criterion.com/current/top-10-lists/212-bong-joon-ho-s-top-10",
    source: "Criterion Collection"
  }
];

const recommendationsData = [
  {
    id: 4,
    artistId: 1,
    movieId: 12,
    source_ids: [ 1, 2 ]
  }, {
    id: 5,
    artistId: 1,
    movieId: 23,
    cite: "https://nofilmschool.com/bill-hader-best-movies-list"
  }, {
    id: 6,
    artistId: 1,
    movieId: 34,
    cite: "https://nofilmschool.com/bill-hader-best-movies-list"
  }, {
    id: 7,
    artistId: 1,
    movieId: 45,
    cite: "https://nofilmschool.com/bill-hader-best-movies-list"
  }, {
    id: 8,
    artistId: 2,
    movieId: 45,
    cite: "https://nofilmschool.com/bill-hader-best-movies-list"
  }, {
    id: 9,
    artistId: 3,
    movieId: 34,
    cite: "https://nofilmschool.com/bill-hader-best-movies-list"
  }
];

function getMovieToArtistCounts(recommendationsData) {
  const movieScores = {};

  recommendationsData.map(recommendation => {
    const currMovieId = recommendation.movieId;
    const currArtistId = recommendation.artistId;
    const currArtist = artistsData.find(artist => artist.id === currArtistId);
    const currMovie = moviesData.find(movie => movie.id === currMovieId);
    if(movieScores[currMovie.movieTitle]) {
      movieScores[currMovie.movieTitle].push({artistName: currArtist.name, cite: recommendation.cite})
    } else {
      movieScores[currMovie.movieTitle] = [];
      movieScores[currMovie.movieTitle].push({artistName: currArtist.name, cite: recommendation.cite})
    }
    return movieScores;
  })
  return movieScores
};

const movieArtistsCountsData = getMovieToArtistCounts(recommendationsData);

function sortMoviesList(movieArtistsCountsData) {
  const movieTitles = Object.keys(movieArtistsCountsData);
  movieTitles.sort((titleA, titleB) => { return movieArtistsCountsData[titleB].length -  movieArtistsCountsData[titleA].length});
  return movieTitles
}

const sortedMovies = sortMoviesList(movieArtistsCountsData);

export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedMovies: sortedMovies,
      movieToArtistCounts: movieArtistsCountsData,
      favoriteMoviesPerArtist: recommendationsData
    }
  }

  genMovie = movieTitle => {
    const currMovieArtists = this.state.movieToArtistCounts[movieTitle];
    return (
        <li key={movieTitle}>
          {movieTitle}
          <ArtistList artists={currMovieArtists}/>
        </li>
    );
  }

  render() {
    return(
      <div className="movie-list">
        <h1>Movies to Watch</h1>
        <ol>
          {this.state.sortedMovies.length > 0 && this.state.sortedMovies.map(movieTitle => {
            return this.genMovie(movieTitle)
          })}
        </ol>
        <div className="pagination">
          <h5>next</h5>
          <div className="rectangle"></div>
          <div className="next-arrow"></div>
          <h5>prev</h5>
          <div className="prev-arrow"></div>
          <div className="rectangle"></div>
        </div>
      </div>
    )
  }
}