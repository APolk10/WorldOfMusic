import * as React from 'react';
import * as axios from 'axios';

const Footer: React.FC = () => {

  const handleLogoutClick = () => {

  }
  return (
    <div className="footer">
      <p>Footer</p>
      <button type='button' onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}

export default Footer;
