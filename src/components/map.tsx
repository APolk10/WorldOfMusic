import * as React from 'react';
import { useState, useEffect } from 'react';
import Globe from'react-globe.gl';
import CountryInfo from '../components/countryInfo';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

const Map: React.FC = () => {
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
    // move this axios call to index to flow down properly
    axios.get(`http://localhost:3001/getCountryData/${countryISOCode}`)
    .then((res: { data: {} }) => {
      setCountry(res.data)
      // pass the name to countryInfo
    });
  }

  function polygonColor() {
    return '#325240';
  }

  function polygonOutline() {
    return 'black';
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
          globeImageUrl={'images/worldMap2.jpg'}
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
