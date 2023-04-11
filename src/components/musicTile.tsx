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

  const handleFavoritesClick = () => {
    let artistName = artist.name;
    addFavorite(artistName);
  }

  const addFavorite = (artistName: string) => {
    axios.post(`${URL}/addFavorite`, { country: nameOfCountry, name: artistName, username: username }, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  }


  return (
    <div className='tileBox'>
       <div className='tile'>
        <div className='tileInner'>
          <div className='tileInfoHeader'>Country of Origin:
            <p className='tileInfoData'>{nameOfCountry}</p>
          </div>
          <div className='tileInfoHeader'>Full Name:
            <p className='tileInfoData'>{artist.name}</p>
          </div>
          <div className='tileInfoHeader'>Alternative Name:
            <p className='tileInfoData'>{artist.aliases ? artist.aliases[0].name : 'unknown'}</p>
          </div>
          <div className='tileInfoHeader'>Solo or Group:
            <p className='tileInfoData'>{artist.type === 'Person' ? 'solo' : 'group'}</p>
          </div>
        </div>
        <div>
          <div className='buttonsDiv'>
            <button type='submit' className='spotifyButton' onClick={redirectToSpotify}>Find Their Music</button>
            <button type='button' className='addFavButton' onClick={handleFavoritesClick}>Favorite This</button>
          </div>
        </div>

       </div>
    </div>
  )
}

export default MusicTile;

