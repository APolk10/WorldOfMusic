import * as React from 'react';
import { useState } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

interface mapProps {
  handleCountrySelection({}, name: string):void;
}

const animation = 'flashSideBar 1s linear infinite';

const Map: React.FC<mapProps> = ({ handleCountrySelection }) => {
  const[countryClicked, setClicked] = useState();
  const[selectedCountry, setCountry] = useState({});

  function handlePolygonClick(e: any) {
    setClicked(e);
    let countryISOCode: string = e.properties.ISO_A2;
    let countryName = e.properties.BRK_NAME;

    axios.get(`http://localhost:10000/getCountryData/${countryISOCode}`, { withCredentials: true })
    .then((res: { data: {} }) => {
      setCountry(res.data)
      handleCountrySelection(res.data, countryName)
      document.getElementById('countryInfoContainer')!.style.animation = animation;
    });

    axios.post(`http://localhost:10000/trackClick`, { country: countryName, iso: countryISOCode}, { withCredentials: true })
    .then((res: { data: {} }) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err))
  }

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
          width={w * .8}
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
