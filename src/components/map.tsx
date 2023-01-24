import * as React from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import Globe from'react-globe.gl'

const geoUrl: string = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

const styleCountry: object = {
  default: {
    fill: '#EEE',
    outline: 'none',
  },
  hover: {
    fill: 'red',
    outline: 'black',
  },
  pressed: {
    fill: 'green',
    outline: 'none',
  }
}

function Map () {
  return (
    <div className='mapContainer'>
      <Globe
          // pointsData={myData}
          width={1400}
          backgroundColor='black'
          pointsData={[]}
          globeImageUrl={'images/worldMap.jpg'}
          showGraticules={true}
          showAtmosphere={true}

        />
    </div>
  )
}

export default Map
