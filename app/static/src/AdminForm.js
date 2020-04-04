import React, { useState } from 'react';
import './styles/admin_form.scss';

function AdminForm() {
  const [artistName, setArtistName] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [sourceShortName, setSourceShortName] = useState('');
  const [movieName, setMovieName] = useState('');
  const [movieDirector, setDirector] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [formError, setFormError] = useState('');

  function addMovieToList(e) {
    e.preventDefault();
    return setMovieList(
      [...movieList, { movieName: movieName, movieDirector: movieDirector}]
    );
  }

  function submitMoviesForDirector(e) {
    e.preventDefault();
    try {
      fetch("/api/v1/add_recommendation", {
        method: "POST",
        data: {
          artist_name: artistName,
          movie_list: movieList,
          source_link: sourceLink,
          source_short_name: sourceShortName
        }
      })
    } catch(e) {
      console.error(e);
      setFormError(e.message)
    } finally {
      if (formError.length > 0) {
        console.log('finally')
      }
    }
  }

  return (
    <form className="admin-form" onSubmit={(e) => submitMoviesForDirector(e)}>
      <label>
        Artist Name
        <input
          type="text"
          value={artistName ? artistName : ''}
          onChange={(e) => setArtistName(e.currentTarget.value)}
        />
      </label>
      <label>
        Source Link
        <input
          type="url"
          value={sourceLink ? sourceLink : ''}
          onChange={(e) => setSourceLink(e.currentTarget.value)}
        />
      </label>
      <label>
        Source Short Name
        <input
          type="text"
          value={sourceShortName ? sourceShortName : ''}
          onChange={(e) => setSourceShortName(e.currentTarget.value)}
        />
      </label>
      <label>
        Movie Name
        <input
          type="text"
          value={movieName ? movieName : ''}
          onChange={(e) => setMovieName(e.currentTarget.value)}
        />
      </label>
      <label>
        Movie Director
        <input
          type="text"
          value={movieDirector ? movieDirector : ''}
          onChange={(e) => setDirector(e.currentTarget.value)}
        />
      </label>
      <button onClick={(e) => addMovieToList(e)}>
        Add Movie
      </button>
      {movieList.length > 0 &&
        <ul>
          {movieList.map((movie, index) => {
            return (
              <li key={index}>{movie.movieName}</li>
            )
            })}
        </ul>
      }
      <input value="Submit" type="submit" />
    </form>
  );
}

export default AdminForm;