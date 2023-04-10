import * as React from 'react';
import { useRef } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

interface hexMapProps {
  handleCountrySelection({}, name: string):void;
}

const animation = 'flashSideBar 1s linear infinite';

const HexMap: React.FC<hexMapProps> = ({ handleCountrySelection }) => {
  let countryClicked = {};
  let countryRef = useRef(countryClicked);

  function handlePolygonClick(e: any) {
    countryRef.current = e;
    let countryISOCode: string = e.properties.ISO_A2;
    let countryName = e.properties.BRK_NAME;

    axios.get(`http://localhost:10000/getCountryData/${countryISOCode}`, { withCredentials: true })
    .then((res: { data: {} }) => {
      handleCountrySelection(res.data, countryName)
      document.getElementById('countryInfoContainer')!.style.animation = animation;
      document.getElementById('countryInfoContainerToggle')!.style.animation = animation;
    });

    axios.post(`http://localhost:10000/trackClick`, { country: countryName, iso: countryISOCode}, { withCredentials: true })
    .then((res: { data: {} }) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err))
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
        width={w * .8}
        backgroundColor='black'
        // globeImageUrl={'images/worldMap2.jpg'}
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
