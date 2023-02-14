import { eventNames } from 'process';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MusicTile from './musicTile';

interface DataProps {
  countryArtists: any[];
  nameOfCountry: string;
}

const CountryInfo: React.FC<DataProps> = ({ countryArtists, nameOfCountry }) => {
  const[open, setOpen] = useState(false);
  const[header, setHeader] = useState({ text: 'Click a country to find music!'})

  const handleSideBarCursorEnter = () => {
    // setOpen(true);
  }

  const handleSideBarCursorLeave = () => {
    closeSideBar();
  }

  const handleSideBarButtonPush = () => {
    open === false ? openSideBar() : closeSideBar();
  }

  const openSideBar = () => {
    document.getElementById('countryInfoContainer')!.id = 'countryInfoContainerToggle';
    setOpen(true);
  }

  const closeSideBar = () => {
    document.getElementById('countryInfoContainerToggle')!.id = 'countryInfoContainer';
    setOpen(false);
  }

  useEffect(() => {
    // let sideBar = document.getElementById('countryInfoContainer') as HTMLDivElement;
    // sideBar.addEventListener('mouseenter', handleSideBarCursorEnter);
    // sideBar.addEventListener('mouseleave', handleSideBarCursorLeave);
  },[])

  return (
    <div className='countryInfoContainer' id='countryInfoContainer'>
      { open === true ?
      <div className='carousel'>
        { countryArtists.length ? countryArtists.map((artist) => <MusicTile key={artist.name} artist={artist} nameOfCountry={nameOfCountry}/>) : <div className='placeholderText'>{header.text}</div>}
        <button className='closeButton' onClick={handleSideBarButtonPush}>X</button>
      </div> : <button className='openButton' type='button' onClick={handleSideBarButtonPush}>&rarr;</button>}
    </div>

  )
}

export default CountryInfo;
