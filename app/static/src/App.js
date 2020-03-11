import React from 'react';
import AddMovie from './AddMovie';
import './App.css';
import AddDirector from './AddDirector';
import MoviesList from './MoviesList';

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

function App() {
  return (
    <div className="App">
      <AddDirector />
      <AddMovie />
      <MoviesList />
    </div>
  );
}

export default App;
