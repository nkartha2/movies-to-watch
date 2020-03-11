import React from 'react';

export default class DirectorForm extends React.Component {
  constructor() {
    super();
    this.state = {
      director: "",
      directorToAdd: ""
    };
  }

  onChange = (directorValue) => {
    this.setState({directorToAdd: directorValue})
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({director: this.state.directorToAdd})
  }

  render() {
    return (
      <form onSubmit={(e) => {this.onSubmit(e)}}>
        <label>
          Director
          <input
            value={this.state.directorToAdd}
            onChange={(e) => this.onChange(e.currentTarget.value)}
          />
        </label>
        <input value="Submit" type="submit" />
      </form>
    );
  }
}