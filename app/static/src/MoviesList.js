import React from 'react';
import './styles/main_movie_list.scss';
import ArtistList from './ArtistList';


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
      ).then(response => response.json()).then(json =>
        this.setState({movieList: json})
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
        <h1>Movies to Watch</h1>
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