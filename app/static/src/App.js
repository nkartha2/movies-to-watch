import React from 'react';
import AddMovie from './AddMovie';
import './App.css';
import AddDirector from './AddDirector';
import MoviesList from './MoviesList';
import './styles/_base.scss';

function App() {
  return (
    <div className="App">
      <div className="app-body">
        <MoviesList />
      </div>
      {/* if admin */}
      {/* <AddDirector /> */}
      {/* <AddMovie /> */}
    </div>
  );
}

export default App;
