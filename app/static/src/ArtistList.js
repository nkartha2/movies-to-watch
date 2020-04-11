import React, { useState } from 'react';

function ArtistList(props) {
  const { artists }  = props;

  const [activeSource, setActiveSource] = useState('')

  const genArtist = (artist) => {
    return (
      <li
        onClick={() => {
          if(activeSource === artist.artist_name) {
            setActiveSource('')
          } else {
            setActiveSource(artist.artist_name)
          }
        }}
        key={artist.artist_name}
      >
        <div className={`see-source-arrow ${activeSource === artist.artist_name ? 'active' : ''}`}></div>
        {artist.artist_name}
        {activeSource === artist.artist_name &&
          <a
            className="active-source"
            href={artist.source_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {artist.source_name}
          </a>
        }
      </li>
    );
  }

  return (
    <ul>
      <h5>Recommended by</h5>
      {artists.length > 0 && artists.map(artist => {
        return genArtist(artist)
      })}
    </ul>
  );
}

export default ArtistList;