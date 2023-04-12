import * as React from 'react';

interface FavoriteBoxProps {
  favorites: any[]
}

const FavoriteBox: React.FC<FavoriteBoxProps> = ({ favorites }) => {

  return (
    <>
    <div className='box'>
        <div className='boxHeader'>
          <p>Your Favorites</p>
          <div id='sortClicksBtns'>
            {/* <button id='sortClicksBtnDescend' type='button' >v</button>
            <button  id='sortClicksBtnAscend' type='button' >v</button> */}
          </div>
        </div>
        <div className='boxData'>
          { favorites ? favorites.map(fav =>
              <div className='dataEntryRow' key={fav.artist}>
                <p>{fav.artist}</p>
                <p>{fav.country}</p>
              </div>)
            : <div className='dataEntry'>Favorites Will Display Here</div>}
        </div>
      </div>

    </>

  )
};

export default FavoriteBox;