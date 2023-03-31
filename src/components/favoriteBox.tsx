import * as React from 'react';
import { useState } from 'react';

interface FavoriteBoxProps {
  favorites: any[]
}

const FavoriteBox: React.FC<FavoriteBoxProps> = ({ favorites }) => {

  return (
    <div className='dataEntry'>Favs</div>
  )
};

export default FavoriteBox;