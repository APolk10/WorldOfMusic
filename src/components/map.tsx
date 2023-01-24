import { NONAME } from 'dns'
import * as React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

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
      <ComposableMap className='map'>
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
      </ComposableMap>
    </div>
  )
}

export default Map
