import React from 'react';

export default class AddMovieForm extends React.Component {
  constructor() {
    super();

    this.state = {
      movieTitle: "",
      movieDirector: "",
      movies: []
    };
  }

  reset = () => {
    this.setState({movieTitle: "", movieDirector: ""})
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState(prevState => {
      prevState.movies.push({
        movieTitle: this.state.movieTitle,
        movieDirector: this.state.movieDirector
      });
      return {movies: prevState.movies}
    });
    this.reset();
  }

  onChangeInput = (enteredValue, inputName) => {
    this.setState({[inputName]: enteredValue});
  }

  createInput = (inputLabel, inputName, inputValue, inputType) => {
    return (
      <label>
        {inputLabel}
        <input
          onChange={(e) => this.onChangeInput(e.currentTarget.value, inputName)}
          type={inputType}
          value={inputValue}
        />
      </label>
    );
  }

  createItem = (movie) => {
    return (
      <li key={movie.movieTitle}>
        <p>{movie.movieTitle}, {movie.movieDirector}</p>
      </li>
    );
  }

  createMovieList = () => {
    return (
      <ol>
        {this.state.movies.map(movie => {
          return this.createItem(movie);
        })}
      </ol>
    );
  }

  render() {
    return(
      <div>
        <form onSubmit={(e) => this.onSubmit(e)}>
          {this.createInput("Movie Title", "movieTitle", this.state.movieTitle, "text")}
          {this.createInput("Movie Director", "movieDirector", this.state.movieDirector, "text")}
          <input type="submit" value="Add Movie" />
        </form>
        {this.state.movies.length > 0 && this.createMovieList()}
      </div>
    );
  }
}