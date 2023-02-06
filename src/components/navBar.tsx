import * as React from 'react'
import Analytics from './analytics';
import { useState } from 'react';

interface FunctionProps {
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>):void;
}

const NavBar: React.FC<FunctionProps> = ({ onSearchChange }) => {
  const[isOpen, setOpen] = useState(false);
  return (
    <div className='navbar'>
      <label className='searchFunctionLabelBox'>Find A Country
      <div className='searchInputs'>
        <input id='searchForCountryInput' type='search' onChange={onSearchChange}></input>
        <input id='searchForCountryButton' type='submit' value='Go!'></input>
      </div>
      </label>
      <div>Favorites</div>
      <Analytics />
    </div>
  )
}

export default NavBar
