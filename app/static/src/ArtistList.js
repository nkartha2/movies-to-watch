import React, { useState } from 'react';

function ArtistList(props) {
  const { artists }  = props;

  const [activeSource, setActiveSource] = useState('')

  const genArtist = (artist) => {
    return (
      <li
        onClick={() => {
          if(activeSource === artist.artistName) {
            setActiveSource('')
          } else {
            setActiveSource(artist.artistName)
          }
        }}
        key={artist.artistName}
      >
        <div className={`see-source-arrow ${activeSource === artist.artistName ? 'active' : ''}`}></div>
        {artist.artistName}
        {activeSource === artist.artistName &&
          <a
            className="active-source"
            href={artist.cite}
            target="_blank"
            rel="noopener noreferrer"
          >
            {artist.cite}
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