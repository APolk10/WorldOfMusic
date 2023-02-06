import * as React from 'react';
import { useState, useEffect } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

interface mapProps {
  handleCountrySelection({}, name: string):void;
}

const Map: React.FC<mapProps> = ({ handleCountrySelection }) => {
  const[countries, setCountries] = useState(mapOverlay);
  const[countryClicked, setClicked] = useState();
  const[selectedCountry, setCountry] = useState({});

  // possibly implement a static colorset after first render of all countries
  const[colors, addColors] = useState([]);
  const[counter, incrementCounter] = useState(1);


  function handlePolygonClick(e: any) {
    setClicked(e);
    let countryISOCode: string = e.properties.ISO_A2;
    let countryName = e.properties.BRK_NAME;

    axios.get(`http://localhost:3001/getCountryData/${countryISOCode}`)
    .then((res: { data: {} }) => {
      setCountry(res.data)
      handleCountrySelection(res.data, countryName)
    });

    axios.post(`http://localhost:3001/trackClick`, {
      country: countryName
    })
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

  return (
    <div className='mapContainer'>
      <Globe
          width={1400}
          backgroundColor='black'
          globeImageUrl={'images/worldMap2.jpg'}
          backgroundImageUrl={'//unpkg.com/three-globe/example/img/night-sky.png'}
          polygonsData={countries.features}
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
