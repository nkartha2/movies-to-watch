import React from 'react';
import AddMovie from './AddMovie';
import './App.css';
import AddDirector from './AddDirector';
import MoviesList from './MoviesList';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="app-body">
        {/* <img src="./collage.jpg"/> */}
        <MoviesList />
      </div>
      {/* if admin */}
      {/* <AddDirector /> */}
      {/* <AddMovie /> */}
    </div>
  );
}

export default App;
