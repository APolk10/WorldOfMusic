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
      {/* <ComposableMap className='map' projection='geoEqualEarth'>
        <ZoomableGroup>
          <Geographies  geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                key={geo.rsmKey}
                geography={geo}
                style={styleCountry}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap> */}
      <Globe
          // pointsData={myData}
          width={6000}
          backgroundColor='black'
          polygonsData={[]}
          globeImageUrl={'images/worldMap.jpg'}

        />,
        myDOMElement
    </div>
  )
}

export default Map
