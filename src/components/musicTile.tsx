import * as React from 'react';
import { useState } from 'react';

interface TileProps {
  artist: {
    country: string,
    name: string,
    aliases: [
      { name: string }
    ],
    type: string,
  },
  nameOfCountry: string,
}

const MusicTile: React.FC<TileProps> = ({ artist, nameOfCountry }) => {

  console.log(artist);
  return (
    <div>
       <div className='tile'>
        <p>Country of Origin: {nameOfCountry}</p>
        <p>Full Name: {artist.name}</p>
        <p>Alternative Name: {artist.aliases ? artist.aliases[0].name : 'unknown'}</p>
        <p>Solo or Group: {artist.type === 'Person' ? 'solo' : 'group'}</p>
       </div>
       <button className='spotifyButton'>Spotify</button>
    </div>
  )
}

export default MusicTile;

