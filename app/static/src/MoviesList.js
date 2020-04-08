import React from 'react';
import './styles/main_movie_list.scss';
import ArtistList from './ArtistList';

// const moviesData = [
//   {
//     id: 12,
//     movieTitle: "The 400 Blows",
//     movieDirector: "Kim Ki-young"
//   }, {
//     id: 23,
//     movieTitle: "The Ballad of Narayama",
//     movieDirector: "Keisuke Kinoshita"
//   }, {
//     id: 34,
//     movieTitle: "Being John Malkovich",
//     movieDirector: "Spike Jonze"
//   }, {
//     id: 45,
//     movieTitle: "Deliverance",
//     movieDirector: "John Boorman"
//   }, {
//     id: 50,
//     movieTitle: "Grand Budapest Hotel",
//     movieDirector: "Wes Anderson"
//   }
// ];

// const artistsData = [
//   {
//     id: 1,
//     name: "Bong Joon Ho"
//   }, {
//     id: 2,
//     name: "Stanley Kubrick"
//   }, {
//     id: 3,
//     name: "Bill Hader"
//   }, {
//     id: 4,
//     name: "Tilda Swinton"
//   }
// ];

// const source = [
//   {
//     id: 1,
//     source_link: "https://nofilmschool.com/bill-hader-best-movies-list",
//     source: "No Film School"
//   },
//   {
//     id: 2,
//     source_link: "https://www.criterion.com/current/top-10-lists/212-bong-joon-ho-s-top-10",
//     source: "Criterion Collection"
//   }
// ];

// const recommendationsData = [
//   {
//     id: 4,
//     artistId: 1,
//     movieId: 12,
//     source_ids: [ 1, 2 ]
//   }, {
//     id: 5,
//     artistId: 1,
//     movieId: 23,
//     cite: "https://nofilmschool.com/bill-hader-best-movies-list"
//   }, {
//     id: 6,
//     artistId: 1,
//     movieId: 34,
//     cite: "https://nofilmschool.com/bill-hader-best-movies-list"
//   }, {
//     id: 7,
//     artistId: 1,
//     movieId: 45,
//     cite: "https://nofilmschool.com/bill-hader-best-movies-list"
//   }, {
//     id: 8,
//     artistId: 2,
//     movieId: 45,
//     cite: "https://nofilmschool.com/bill-hader-best-movies-list"
//   }, {
//     id: 9,
//     artistId: 3,
//     movieId: 34,
//     cite: "https://nofilmschool.com/bill-hader-best-movies-list"
//   }
//   // , {
//   //   id: 10,
//   //   artistId: 4,
//   //   movieId: 50,
//   //   cite: "https://nofilmschool.com/bill-hader-best-movies-list"
//   // }
// ];

// function getMovieToArtistCounts(recommendationsData) {
//   const movieScores = {};

//   recommendationsData.map(recommendation => {
//     const currMovieId = recommendation.movieId;
//     const currArtistId = recommendation.artistId;
//     const currArtist = artistsData.find(artist => artist.id === currArtistId);
//     const currMovie = moviesData.find(movie => movie.id === currMovieId);
//     if(movieScores[currMovie.movieTitle]) {
//       movieScores[currMovie.movieTitle].push({artistName: currArtist.name, cite: recommendation.cite})
//     } else {
//       movieScores[currMovie.movieTitle] = [];
//       movieScores[currMovie.movieTitle].push({artistName: currArtist.name, cite: recommendation.cite})
//     }
//     return movieScores;
//   })
//   return movieScores
// };

// const movieArtistsCountsData = getMovieToArtistCounts(recommendationsData);

// function sortMoviesList(movieArtistsCountsData) {
//   const movieTitles = Object.keys(movieArtistsCountsData);
//   movieTitles.sort((titleA, titleB) => { return movieArtistsCountsData[titleB].length -  movieArtistsCountsData[titleA].length});
//   return movieTitles
// }

// const sortedMovies = sortMoviesList(movieArtistsCountsData);

export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      page: 1,
      items: 4
    }
  }

  fetchMovieList = () => {
    console.log('fetch ', this.state.page)
    try {
      fetch(
        `http://localhost:5000/api/v1/recommendations?page=${this.state.page}&items=${this.state.items}`,
        {
          method: "GET",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          }
        }
      )
    } catch(e) {
      console.error()
    }
  }

  componentDidMount(){
    this.fetchMovieList();
  }

  genMovie = movieTitle => {
    const currMovieArtists = this.state.movieToArtistCounts[movieTitle];
    return (
        <li key={movieTitle}>
          <h3>{movieTitle}</h3>
          <ArtistList artists={currMovieArtists}/>
        </li>
    );
  }

  onClickPrev = () => {
    this.setState(prevState => {
      prevState.page = prevState.page -= 1;
      return {page: prevState.page}
    });
    this.fetchMovieList();
  }

  onClickNext = () => {
    this.setState(prevState => {
      prevState.page = prevState.page += 1;
      console.log(prevState.page)
      return {page: prevState.page}
    })

    return this.fetchMovieList();
  }

  render() {
    return(
      <div className="movie-list">
        <h1>Movies to Watch</h1>
        <ol>
          {this.state.movieList.length > 0 && this.state.movieList.map(movieTitle => {
            return this.genMovie(movieTitle)
          })}
        </ol>
        <div className="pagination">
          {this.state.page > 1 &&
            <div onClick={() => this.onClickPrev()}>
              <h5>prev</h5>
              <div className="prev-arrow"></div>
              <div className="rectangle"></div>
            </div>
          }
          <div onClick={() => this.onClickNext()}>
            <h5>next</h5>
            <div className="rectangle"></div>
            <div className="next-arrow"></div>
          </div>
        </div>
      </div>
    )
  }
}