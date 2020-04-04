import React from 'react';
import MoviesList from './MoviesList';
import './styles/_base.scss';
// import AdminForm from './AdminForm';

function App() {
  return (
    <div className="App">
      <div className="app-body">
        <MoviesList />
      </div>
      {/* if admin */}
      {/* <AdminForm/> */}
    </div>
  );
}

export default App;
