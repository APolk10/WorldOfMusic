import * as React from 'react';
import { useState } from 'react';

const CountryInfo: React.FC = () => {
  const[open, setOpen] = useState(false)
  return (
    <div className='countryInfoContainer'>
        <div className='tile'>1</div>
        <div className='tile'>2</div>
        <div className='tile'>3</div>
        <div className='tile'>4</div>
    </div>
  )
}

export default CountryInfo;
