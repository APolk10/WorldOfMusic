import * as React from 'react';
import { useState, useEffect } from 'react';
import MusicTile from './musicTile';

interface DataProps {
  countryArtists: any[];
}

const CountryInfo: React.FC<DataProps> = ({ countryArtists }) => {
  const[open, setOpen] = useState(false);
  const[header, setHeader] = useState({ text: 'Click a country to find music!'})

  const handleSideBarHover = () => {
    // setOpen(true);
  }

  const handleSideBarLeave = () => {
    // setOpen(false);
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
    let sideBar = document.getElementById('countryInfoContainer') as HTMLDivElement;
    sideBar.addEventListener('mouseenter', handleSideBarHover);
    sideBar.addEventListener('mouseleave', handleSideBarLeave);
  },[])

  return (
    <div className='countryInfoContainer' id='countryInfoContainer'>
      { open === true ?
      <div className='carousel'>
          { countryArtists.length ? countryArtists.map((artist) => { return <div className='tile'>{artist.name}</div>}) : <div className='unpopulatedTile'>{header.text}</div> }
          <button className='closeButton' onClick={handleSideBarButtonPush}>Close</button>
      </div> : <button className='openButton' type='button' onClick={handleSideBarButtonPush}>Arrow</button>}
    </div>

  )
}

export default CountryInfo;
