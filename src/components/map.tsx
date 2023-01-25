import * as React from 'react';
import { useState, useEffect } from 'react';
import Globe from'react-globe.gl';
import mapOverlay from '../../data/mapOverlay.js';
import axios from 'axios';

const Map: React.FC = () => {
  const[countries, setCountries] = useState({ features: []});
  const[countryHovered, setHovered] = useState();
  const[colors, addColors] = useState([]);
  const[counter, incrementCounter] = useState(1);


  function handlePolygonClick(e: any) {
    console.log('clicked!', e)
    setHovered(e);
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
    if(hex) {
      const data = hex.properties;
      const coords = hex.bbox;
      console.log(data.ADMIN, coords)
    }
  }

  useEffect(() => {
    // axios.get('http://localhost:3001/getCountryData')
    //   .then((res: object) => {
    //     console.log(res)
    //   })
      setCountries(mapOverlay)
  }, [countries])

  return (
    <div className='mapContainer'>
      <Globe
          width={1400}
          backgroundColor='black'
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonColor={randomizeColor}
          hexPolygonAltitude={(d) => d === countryHovered ? 0.1 : 0.01}
          onHexPolygonClick={handlePolygonClick}
          onHexPolygonHover={handlePolygonHover}
          // globeImageUrl={'images/worldMap3.jpg'}
          showGraticules={true}
          hexPolygonsTransitionDuration={100}
          showAtmosphere={true}
        />
    </div>
  )
}

export default Map;
