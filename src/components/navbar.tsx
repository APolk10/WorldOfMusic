import * as React from 'react'
import Favorites from './favorites';
import Analytics from './analytics';
import { useState } from 'react';
import DataBox from './dataBox';
import FavoriteBox from './favoriteBox';

interface FunctionProps {
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>):void,
  metadata: any[],
}

// pass an opener function to each child (analytics/fav/search) and when activated, open and pass props accordingly
const NavBar: React.FC<FunctionProps> = ({ onSearchChange, metadata }) => {
  const[isOpen, setOpen] = useState(false);
  const[mode, setMode] = useState('global');

  const toggleNavbar = (mode: string) => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    if (!isOpen) {
      adjustNavbar(navbar);
    }
    setMode(mode);
  }

  const restoreNavbar = (navbar: HTMLElement) => {
    navbar.style.height = '13vh';
    navbar.style.backgroundColor = 'rgba(69, 233, 233, 0.25)';
    setOpen(false);
  }

  const adjustNavbar = (navbar: HTMLElement) => {
    navbar.style.height = '96vh';
    navbar.style.backgroundColor = 'rgba(69, 233, 233, 0.25)'
    setOpen(true);
  }

  const handleCloseButton = () => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    restoreNavbar(navbar);
  }

  return (
    <div>
      <div className='navbar' id='navbar'>
        <div className='navbarUpper'>
          <div>
            <label className='searchFunctionLabelBox'>Find A Country
            <div className='searchInputs'>
              <input id='searchForCountryInput' type='search' placeholder='country name' onChange={onSearchChange}></input>
              <input id='searchForCountryButton' type='submit' value='Go!'></input>
            </div>
            </label>
          </div>
          <Favorites toggle={toggleNavbar}/>
          <Analytics toggle={toggleNavbar}/>
        </div>
        { isOpen && mode === 'global' ?
          <div className='navbarLower'>
            <DataBox data={metadata}></DataBox>
            <button className='navbarCloseBtn' type='button' onClick={handleCloseButton}>Close</button>
          </div>
        : isOpen && mode === 'favorites' ?
          <div className='navbarLower'>
            <FavoriteBox favorites={['canada', 'usa']}></FavoriteBox>
          <button className='navbarCloseBtn' type='button' onClick={handleCloseButton}>Close</button>
      </div>
        :
        <div className='navBarUpper'>
          {/* <button className='navbarOpenBtn' type='button' onClick={toggleNavbar}>See More!</button> */}
        </div>}
      </div>
    </div>
  )
}

export default NavBar
