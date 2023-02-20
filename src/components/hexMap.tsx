import * as React from 'react';
import { useState, useEffect } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

interface hexMapProps {
  handleCountrySelection({}, name: string):void;
}

const HexMap: React.FC<hexMapProps> = ({ handleCountrySelection }) => {
  const[countries, setCountries] = useState(mapOverlay);
  const[countryClicked, setClicked] = useState();
  const[selectedCountry, setCountry] = useState({});

  function handlePolygonClick(e: any) {
    setClicked(e);
    let countryISOCode: string = e.properties.ISO_A2;
    let countryName = e.properties.BRK_NAME;
    axios.get(`http://localhost:3001/getCountryData/${countryISOCode}`)
    .then((res: { data: {} }) => {
      setCountry(res.data)
      handleCountrySelection(res.data, countryName)
    });
  }

  function randomRGB() {
    let randomColor: string = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return randomColor;
  }

  function randomizeColor() {
    // 177 is the color threshold
    let randomColor: string = randomRGB();
    return randomColor;
  }

  function handlePolygonHover(hex: any) {
  }

  return (
    <div className='mapContainer'>
      <Globe
        width={1400}
        backgroundColor='black'
        globeImageUrl={'images/worldMap2.jpg'}
        backgroundImageUrl={'//unpkg.com/three-globe/example/img/night-sky.png'}
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
