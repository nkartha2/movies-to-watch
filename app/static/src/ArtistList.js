import React, { useState } from 'react';

function ArtistList(props) {
  const { artists }  = props;

  const [activeSource, setActiveSource] = useState('')

  const genArtist = (artist) => {
    return (
      <li
        onClick={() => setActiveSource(artist.artistName)}
        key={artist.artistName}
      >
        <div className="see-source-arrow"></div>
        {artist.artistName}
        {activeSource === artist.artistName &&
          <a
            href={artist.cite}
            target="_blank"
            rel="noopener noreferrer"
          >
            source
          </a>
        }
      </li>
    );
  }

  return (
    <ul>
      {artists.length > 0 && artists.map(artist => {
        return genArtist(artist)
      })}
    </ul>
  );
}

export default ArtistList;