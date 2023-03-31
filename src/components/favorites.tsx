import * as React from 'react';

interface FavroitesProps {
  toggle(mode: string):void,
}

const Favorites: React.FC<FavroitesProps> = ({ toggle }) => {

  const handleFavoritesBarClick = () => {
    toggle('favorites')
  }

  return (
    <div className='favoritesBar' onClick={handleFavoritesBarClick}>Favorites</div>
  )
}

export default Favorites;

