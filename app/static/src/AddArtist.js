import React from 'react';

export default class ArtistForm extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      artistToAdd: ""
    };
  }

  onChange = (artistValue) => {
    this.setState({artistToAdd: artistValue})
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({artist: this.state.artistToAdd})
  }

  render() {
    return (
      <form onSubmit={(e) => {this.onSubmit(e)}}>
        <label>
          Artist
          <input
            value={this.state.artistToAdd}
            onChange={(e) => this.onChange(e.currentTarget.value)}
          />
        </label>
        <input value="Submit" type="submit" />
      </form>
    );
  }
}