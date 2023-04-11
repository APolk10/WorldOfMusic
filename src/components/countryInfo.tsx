import * as React from 'react';
import { useState } from 'react';
import MusicTile from './musicTile';

interface DataProps {
  countryArtists: any[],
  nameOfCountry: string,
  username: string,
  URL: string
}

const CountryInfo: React.FC<DataProps> = ({ countryArtists, nameOfCountry, username, URL }) => {
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

  return (
    <div className='countryInfoContainer' id='countryInfoContainer'>
      { open === true ?
      <div className='carousel'>
        { countryArtists.length ? countryArtists.map((artist) => <MusicTile key={artist.name} artist={artist} nameOfCountry={nameOfCountry} username={username} URL={URL} />) : <div className='placeholderText'>{header.text}</div>}
        <button className='closeButton' onClick={handleSideBarButtonPush}>X</button>
      </div> : <button className='openButton' type='button' onClick={handleSideBarButtonPush}>&rarr;</button>}
    </div>

  )
}

export default CountryInfo;
