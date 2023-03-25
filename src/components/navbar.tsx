import * as React from 'react'
import Analytics from './analytics';
import { useState } from 'react';
import DataBox from './dataBox';

interface FunctionProps {
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>):void;
}

const data = [{'argentina': 5}, {'turkey': 10 }, {'usa': 14},]

// pass an opener function to each child (analytics/fav/search) and when activated, open and pass props accordingly
const NavBar: React.FC<FunctionProps> = ({ onSearchChange }) => {
  const[isOpen, setOpen] = useState(false);

  const toggleNavbar = () => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    if (!isOpen) {
      adjustNavbar(navbar);
    }
  }

  const restoreNavbar = (navbar: HTMLElement) => {
    navbar.style.height = '10vh';
    navbar.style.backgroundColor = 'rgba(126, 126, 126, .5)';
    setOpen(false);
  }

  const adjustNavbar = (navbar: HTMLElement) => {
    navbar.style.height = '96vh';
    navbar.style.backgroundColor = 'black'
    setOpen(true);
  }

  const handleCloseButton = () => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    restoreNavbar(navbar);
  }

  return (
    <div>
      <div className='navbar' id='navbar' onClick={toggleNavbar}>
        <div className='navbarUpper'>
          <label className='searchFunctionLabelBox'>Find A Country
          <div className='searchInputs'>
            <input id='searchForCountryInput' type='search' onChange={onSearchChange}></input>
            <input id='searchForCountryButton' type='submit' value='Go!'></input>
          </div>
          </label>
          <div>Favorites</div>
          <Analytics countryClickData={data}/>
        </div>
        { isOpen ?
          <div className='navbarLower'>
            <DataBox data={['hi', 'two']}></DataBox>
            <button className='navbarCloseBtn' type='button' onClick={handleCloseButton}>^^^</button>
          </div>
        : <></>}
      </div>
    </div>
  )
}

export default NavBar
