import * as React from 'react';
import { useState } from 'react';
import MusicTile from './musicTile';

interface DataProps {
  countryArtists: any[],
  nameOfCountry: string,
  username: string,
  URL: string,
  getFavorites(username: string): void
}

const CountryInfo: React.FC<DataProps> = ({ countryArtists, nameOfCountry, username, URL, getFavorites }) => {
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
      <div className='carouselBox'>

        { countryArtists.length ?
        <div className='carouselHeader'>
          <p className='countryTitle'>{nameOfCountry}</p>
          <p className='carouselTitle'>Scroll through artists using the scrollbar at the bottom.</p>
        </div>
        : <></> }
        <div className='carousel'>
          { countryArtists.length ?
          countryArtists.map((artist) =>
          <MusicTile key={artist.name} getFavorites={getFavorites} artist={artist} nameOfCountry={nameOfCountry} username={username} URL={URL} />)
          : <div className='placeholderText'>{header.text}</div> }
        </div>
        <button className='closeButton' onClick={handleSideBarButtonPush}>X</button>
      </div> : <button className='openButton' type='button' onClick={handleSideBarButtonPush}>&rarr;</button>}
    </div>

  )
}

export default CountryInfo;
