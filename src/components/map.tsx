import * as React from 'react';
import { useState } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

interface mapProps {
  handleCountrySelection(dataFromAPI: { artists: [] }, countryName: string):void,
  handlePolygonClick(e: any):void,
  countryClicked: any
}

const Map: React.FC<mapProps> = ({ handleCountrySelection, handlePolygonClick, countryClicked }) => {
  const[selectedCountry, setCountry] = useState({});

  // const URL = 'https://world-of-music.onrender.com';
  const URL = 'http://localhost:3001';

  function polygonColor() {
    return '#325240';
  }

  function polygonOutline() {
    return 'black';
  }

  function handlePolygonHover(hex: any) {
  }

  const w = window.innerWidth;

  return (
    <div className='mapContainer'>
      <Globe
          width={w * .95}
          backgroundColor='black'
          globeImageUrl={'images/worldMap2.jpg'}
          backgroundImageUrl={'images/night-sky.png'}
          polygonsData={mapOverlay.features}
          polygonCapColor={polygonColor}
          polygonSideColor={(polygonOutline)}
          polygonStrokeColor={polygonOutline}
          polygonAltitude={(polygon) => polygon === countryClicked ? 0.15 : 0.01}
          onPolygonClick={handlePolygonClick}
          onPolygonHover={handlePolygonHover}
          showAtmosphere={true}
        />
    </div>
  )
}

export default Map;
