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
    setOpen(true);
  }

  const handleSideBarLeave = () => {
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
          {countryArtists.length ? countryArtists.map((artist) => { return <div className='tile'>{artist.name}</div>}) : <div>{header.text}</div>}
      </div> : <div className='countryInfoContainer'>Arrow</div>}
    </div>

  )
}

export default CountryInfo;
