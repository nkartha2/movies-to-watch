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
      <img src="./collage.jpg"/>
      <MoviesList />
      {/* <AddDirector /> */}
      {/* <AddMovie /> */}
    </div>
  );
}

export default App;
