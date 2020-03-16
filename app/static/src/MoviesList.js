import React from 'react';
import './styles/main_movie_list.scss';

// add to db
// index in db

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

const recommendationsData = [
  {
    id: 4,
    artistId: 1,
    movieId: 12,
  }, {
    id: 5,
    artistId: 1,
    movieId: 23
  }, {
    id: 6,
    artistId: 1,
    movieId: 34
  }, {
    id: 7,
    artistId: 1,
    movieId: 45
  }, {
    id: 8,
    artistId: 2,
    movieId: 45
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
      movieScores[currMovie.movieTitle].push(currArtist.name)
    } else {
      movieScores[currMovie.movieTitle] = [];
      movieScores[currMovie.movieTitle].push(currArtist.name)
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

  genArtist = artist => {
    return (
      <li key={artist}>
        -{artist}
      </li>
    );
  }

  genMovie = movieTitle => {
    const currMovieArtists = this.state.movieToArtistCounts[movieTitle];
    return (
        <li key={movieTitle}>
          {movieTitle}
          <ul>
            <h5>Recommended by</h5>
            {currMovieArtists.length > 0 && currMovieArtists.map(artist => {
              return this.genArtist(artist)
            })}
          </ul>
        </li>
    );
  }

  render() {
    return(
      <div className="movie-list">
        <ol>
          {this.state.sortedMovies.length > 0 && this.state.sortedMovies.map(movieTitle => {
            return this.genMovie(movieTitle)
          })}
        </ol>
      </div>
    )
  }
}