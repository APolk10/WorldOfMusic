import * as React from 'react';
import axios from 'axios';

interface TileProps {
  artist: {
    country: string,
    name: string,
    aliases: [
      { name: string }
    ],
    type: string,
    'life-span': {
      begin: string
    },
  },
  nameOfCountry: string,
  username: string,
  URL: string
}

const MusicTile: React.FC<TileProps> = ({ artist, nameOfCountry, username, URL }) => {

  const redirectToSpotify = () => {
    const link = `https://open.spotify.com/search/${artist.name}`
    window.open(link, "_blank");
  }

  const handleFavoritesClick = (e: React.SyntheticEvent) => {
    const button = e.target as HTMLButtonElement;
    const tag = (e.target as HTMLButtonElement).value;
    const tile: HTMLElement = document.getElementById(tag)!;
    tile.style.border = 'green solid 4px';
    tile.style.backgroundColor = 'lightgreen';
    button.style.display = 'none';
  }

  const addFavorite = (artistName: string) => {
    axios.post(`${URL}/addFavorite`, { country: nameOfCountry, name: artistName, username: username }, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  }


  return (
    <div className='tileBox'>
       <div className='tile' id={artist.name.trim()}>
        <div className='tileInner'>
          <div className='tileRow'>
            <p className='tileInfoHeader'>Country of Origin:</p>
            <p className='tileInfoData'>{nameOfCountry}</p>
          </div>
          <div className='tileRow'>
            <p className='tileInfoHeader'>Name:</p>
            <p className='tileInfoData'>{artist.name.trim()}</p>
          </div>
          <div className='tileRow'>
            <p className='tileInfoHeader'>Local Name:</p>
            <p className='tileInfoData'>{artist.aliases ? artist.aliases[0].name.trim() : 'not available'}</p>
          </div>
          <div className='tileRow'>
            <p className='tileInfoHeader'>Birth Date</p>
            <p className='tileInfoData'>{artist['life-span'].begin ? artist['life-span'].begin : 'not available'}</p>
          </div>
          <div className='tileRow'>
            <p className='tileInfoHeader'>Type:</p>
            <p className='tileInfoData'>{artist.type === 'Person' ? 'solo' : 'group'}</p>
          </div>
        </div>
          <div className='buttonsDiv'>
            <button type='submit' className='spotifyButton' onClick={redirectToSpotify}>Listen</button>
            <button type='button' value={artist.name.trim()} className='addFavButton' onClick={handleFavoritesClick}>Favorite Artist</button>
        </div>
       </div>
    </div>
  )
}

export default MusicTile;

