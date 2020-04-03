import React from 'react';
import ArtistForm from './AddArtist';
import AddMovieForm from './AddMovie';
import './styles/admin_form.scss';

function AdminForm() {
  return (
    <div className="admin-form">
      <ArtistForm/>
      <AddMovieForm/>
    </div>
  );
}

export default AdminForm;