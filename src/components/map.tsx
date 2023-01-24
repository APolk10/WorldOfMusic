import * as React from 'react'
import Globe from'react-globe.gl'

function Map () {
  return (
    <div className='mapContainer'>
      <Globe
          width={1400}
          backgroundColor='black'
          pointsData={[]}
          globeImageUrl={'images/worldMap.jpg'}
          showGraticules={true}
          showAtmosphere={true}
          pointLat={100}
          pointLng={100}
          pointAltitude={100}
        />
    </div>
  )
}

export default Map;
