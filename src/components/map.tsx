import * as React from 'react';
import { useState, useEffect } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../public/images/mapOverlay';
import axios from 'axios';

function Map () {
  const[countries, setCountries] = useState({});


  function handlePolygonClick(e: object) {
    console.log('clicked!', e)
  }

  function randomizeColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  useEffect(() => {
    axios.get('http://localhost:3001/getCountryData')
      .then((res: object) => {
        console.log(res)
      })
  }, [])

  return (
    <div className='mapContainer'>
      <Globe
          width={1400}
          backgroundColor='black'
          hexPolygonsData={mapOverlay.features}
          hexPolygonColor={randomizeColor}
          hexPolygonAltitude={.01}
          onHexPolygonClick={handlePolygonClick}
          // globeImageUrl={'images/worldMap.jpg'}
          showGraticules={true}
          showAtmosphere={true}
        />
    </div>
  )
}

export default Map;
