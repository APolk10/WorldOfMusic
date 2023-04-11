import * as React from 'react';
import { useRef } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../data/mapOverlay.js';

interface hexMapProps {
  handleCountrySelection({}, name: string):void,
  getCountryData(countryISOCode: string, countryName: string):void,
  trackClick(countryISOCode: string, countryName: string):void
}

const HexMap: React.FC<hexMapProps> = ({ handleCountrySelection, getCountryData, trackClick }) => {
  let countryClicked = {};
  let countryRef = useRef(countryClicked);

  // const URL = 'https://world-of-music.onrender.com';
  const URL = 'http://localhost:3001';

  function handlePolygonClick(e: any) {
    countryRef.current = e;
    let countryISOCode: string = e.properties.ISO_A2;
    let countryName = e.properties.BRK_NAME;
    getCountryData(countryISOCode, countryName);
    trackClick(countryISOCode, countryName);
  }

  function randomRGB() {
    let randomColor: string = `#${Math.floor(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`;
    return randomColor;
  }

  function randomizeColor() {
    return randomRGB();
  }

  const w = window.innerWidth;

  return (
    <div className='mapContainer'>
      <Globe
        width={w * .95}
        backgroundColor='black'
        globeImageUrl={'images/earth-dark.jpg'}
        backgroundImageUrl={'images/night-sky.png'}
        hexPolygonsData={mapOverlay.features}
        hexPolygonsTransitionDuration={100}
        hexPolygonResolution={3}
        hexPolygonColor={randomizeColor}
        hexPolygonAltitude={(d) => d === countryRef.current ? 0.15 : 0.01}
        onHexPolygonClick={handlePolygonClick}
        showAtmosphere={true}
        />
    </div>
  )
}

export default HexMap;
