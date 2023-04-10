import * as React from 'react';
import { useState } from 'react';
import MusicTile from './musicTile';
import axios from 'axios';

interface DataProps {
  countryArtists: any[];
  nameOfCountry: string;
  username: string;
}

const CountryInfo: React.FC<DataProps> = ({ countryArtists, nameOfCountry, username }) => {
  const[open, setOpen] = useState(false);
  const[header, setHeader] = useState({ text: 'Click a country to find music!'})

  const handleSideBarButtonPush = () => {
    open === false ? openSideBar() : closeSideBar();
  }

  const openSideBar = () => {
    document.getElementById('countryInfoContainer')!.id = 'countryInfoContainerToggle';
    document.getElementById('countryInfoContainerToggle')!.style.animation = 'none';
    setOpen(true);
  }

  const closeSideBar = () => {
    document.getElementById('countryInfoContainerToggle')!.id = 'countryInfoContainer';
    setOpen(false);
  }

  const handleFavoritesClick = () => {
    console.log(nameOfCountry)
    axios.post('http://localhost:3000/addFavorite', { country: nameOfCountry, username: username }, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  }

  return (
    <div className='countryInfoContainer' id='countryInfoContainer'>
      { open === true ?
      <div className='carousel'>
        { countryArtists.length ? countryArtists.map((artist) => <MusicTile key={artist.name} artist={artist} nameOfCountry={nameOfCountry} handleFavoritesClick={handleFavoritesClick}/>) : <div className='placeholderText'>{header.text}</div>}
        <button className='closeButton' onClick={handleSideBarButtonPush}>X</button>
      </div> : <button className='openButton' type='button' onClick={handleSideBarButtonPush}>&rarr;</button>}
    </div>

  )
}

export default CountryInfo;
