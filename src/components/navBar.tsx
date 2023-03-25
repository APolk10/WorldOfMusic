import * as React from 'react'
import Analytics from './analytics';
import { useState } from 'react';

interface FunctionProps {
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>):void;
}

const data = [{'argentina': 5}, {'turkey': 10 }, {'usa': 14},]

// pass an opener function to each child (analytics/fav/search) and when activated, open and pass props accordingly
const NavBar: React.FC<FunctionProps> = ({ onSearchChange }) => {
  const[isOpen, setOpen] = useState(false);

  const toggleNavBar = () => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    navbar.style.height === '95vh'? restoreNavbar(navbar): adjustNavbar(navbar);
  }

  const activateNavBarSection = (element: HTMLElement) => {

  }

  const restoreNavbar = (navbar: HTMLElement) => {
    navbar.style.height = '10vh';
    navbar.style.backgroundColor = 'rgba(126, 126, 126, .5)';
  }

  const adjustNavbar = (navbar: HTMLElement) => {
    navbar.style.height = '95vh';
    navbar.style.backgroundColor = 'black'
  }

  return (
    <div className='navbar' id='navbar' onClick={toggleNavBar}>
      <label className='searchFunctionLabelBox'>Find A Country
      <div className='searchInputs'>
        <input id='searchForCountryInput' type='search' onChange={onSearchChange}></input>
        <input id='searchForCountryButton' type='submit' value='Go!'></input>
      </div>
      </label>
      <div>Favorites</div>
      <Analytics countryClickData={data}/>
    </div>
  )
}

export default NavBar
