import * as React from 'react'

interface FunctionProps {
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>):void;
}

const NavBar: React.FC<FunctionProps> = ({ onSearchChange }) => {
  return (
    <div className='navbar'>
      <input id='searchForCountryInput'type='search' onChange={onSearchChange}></input>
      <div>Favorites</div>
      <div>Analytics</div>
    </div>
  )
}

export default NavBar
