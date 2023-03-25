import * as React from 'react';
import axios from 'axios';

interface FooterProps {
  handleLogoutClick():void,
}
const Footer: React.FC<FooterProps> = ({ handleLogoutClick }) => {

  return (
    <div className="footer">
      <button className='logoutButton' type='button' onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}

export default Footer;
