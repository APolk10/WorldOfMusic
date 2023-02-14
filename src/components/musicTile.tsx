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

  const redirectToSpotify = () => {
    const link = `https://open.spotify.com/search/${artist.name}`
    window.open(link, "_blank");
  }

  return (
    <div className='tileBox'>
       <div className='tile'>
        <p className='tileInfoHeader'>Country of Origin:
          <p className='tileInfoData'>{nameOfCountry}</p>
        </p>
        <p className='tileInfoHeader'>Full Name:
          <p className='tileInfoData'>{artist.name}</p>
        </p>
        <p className='tileInfoHeader'>Alternative Name:
          <p className='tileInfoData'>{artist.aliases ? artist.aliases[0].name : 'unknown'}</p>
        </p>
        <p className='tileInfoHeader'>Solo or Group:
          <p className='tileInfoData'>{artist.type === 'Person' ? 'solo' : 'group'}</p>
        </p>
        <div className='buttonsDiv'>
          <button type='submit' className='spotifyButton' onClick={redirectToSpotify}>Find Their Music</button>
          <button className='addFavButton'>Favorite This</button>
        </div>
       </div>
    </div>
  )
}

export default MusicTile;

