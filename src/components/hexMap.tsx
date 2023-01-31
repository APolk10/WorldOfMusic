import * as React from 'react';
import { useState, useEffect } from 'react';
import Globe from'react-globe.gl';
import CountryInfo from './countryInfo';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

const HexMap: React.FC = () => {
  const[countries, setCountries] = useState(mapOverlay);
  const[countryClicked, setClicked] = useState();
  const[selectedCountry, setCountry] = useState({});

  function handlePolygonClick(e: any) {
    setClicked(e);
    let countryISOCode: string = e.properties.ISO_A2;
    axios.get(`http://localhost:3001/getCountryData/${countryISOCode}`)
    .then((res: { data: {} }) => {
      setCountry(res.data)
    });
  }

  function randomRGB() {
    let randomColor: string = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return randomColor;
  }

  function randomizeColor() {
    // 177 is the limit
    // if (colors.length >= 177) {
    //   counter + 1;
    //   return colors[counter - 1];
    // }
    let randomColor: string = randomRGB();
    return randomColor;
  }

  function handlePolygonHover(hex: any) {
  }

  useEffect(() => {

}, [])

  return (
    <div className='mapContainer'>
      <Globe
        width={1400}
        backgroundColor='black'
        globeImageUrl={'images/worldMap3.jpg'}
        hexPolygonsData={countries.features}
        hexPolygonsTransitionDuration={100}
        hexPolygonResolution={3}
        hexPolygonColor={randomizeColor}
        hexPolygonAltitude={(d) => d === countryClicked ? 0.1 : 0.01}
        onHexPolygonClick={handlePolygonClick}
        onHexPolygonHover={handlePolygonHover}
        showAtmosphere={true}
        />
    </div>
  )
}

export default HexMap;
