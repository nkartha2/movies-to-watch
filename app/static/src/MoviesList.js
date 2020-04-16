import React from 'react';
import './styles/main_movie_list.scss';
import ArtistList from './ArtistList';


export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      page: 1,
      items: 4,
      resultsLength: 0
    }
  }

  fetchMovieList = () => {
    try {
      fetch(
        `https://the-shot-list-app.herokuapp.com/api/v1/recommendations?page=${this.state.page}&items=${this.state.items}`,
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
      ).then(response => response.json()).then(json =>
        this.setState({
          movieList: json.movies,
          resultsLength: json.results_length
        })
      )
    } catch(e) {
      console.error()
    }
  }

  componentDidMount(){
    this.fetchMovieList();
  }

  genMovie = movie => {
    return (
      <li key={movie.title}>
        <h2 className="ranking">{movie.ranking < 10 ? `0${movie.ranking}` : `${movie.ranking}`}</h2>
        <h3>{movie.title}</h3>
        <ArtistList artists={movie.artists}/>
      </li>
    );
  }

  onClickPrev = () => {
    this.setState((prevState => {
      prevState.page -= 1;
      return {page: prevState.page}
    }), () => this.fetchMovieList());
  }

  onClickNext = () => {
    this.setState((prevState => {
      prevState.page += 1;
      return {page: prevState.page}
    }), () => this.fetchMovieList())
  }

  render() {
    return(
      <div className="movie-list">
        <div className="tab-title">
          <h1>The Shot List</h1>
          <p>Filmmaker's Top Picks</p>
        </div>
        <ol>
          {this.state.movieList.length > 0 && this.state.movieList.map(movie => {
            return this.genMovie(movie)
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
          {this.state.movieList && this.state.movieList[this.state.movieList.length - 1] && (this.state.movieList[this.state.movieList.length - 1].ranking !== this.state.resultsLength) &&
            <div onClick={() => this.onClickNext()}>
              <h5>next</h5>
              <div className="rectangle"></div>
              <div className="next-arrow"></div>
            </div>
          }
        </div>
      </div>
    )
  }
}