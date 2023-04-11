import * as React from 'react'
import Favorites from './favorites';
import Analytics from './analytics';
import { useState } from 'react';
import DataBox from './dataBox';
import FavoriteBox from './favoriteBox';

interface FunctionProps {
  onSearchChange(e: React.ChangeEvent<HTMLInputElement>):void,
  metadata: any[],
  favorites: any[],
  handleCountrySearch():void
}

// pass an opener function to each child (analytics/fav/search) and when activated, open and pass props accordingly
const NavBar: React.FC<FunctionProps> = ({ onSearchChange, metadata, favorites, handleCountrySearch }) => {
  const[isOpen, setOpen] = useState(false);
  const[mode, setMode] = useState('global');

  const toggleNavbar = (mode: string) => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    if (!isOpen) {
      adjustNavbar(navbar);
    }
    setMode(mode);
  }

  const toggleNavbarFavBtn = () => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    adjustNavbar(navbar);
    setMode('favorites')
  }

  const toggleNavbarGlobalBtn = () => {
    const navbar: HTMLElement = document.getElementById('navbar')!;
    adjustNavbar(navbar);
    setMode('global');
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
              <input id='searchForCountryInput' type='search' placeholder='country name' list='countryName' onChange={onSearchChange}>
              </input>
                <datalist id='countryName'>
                  <option value='USA'></option>
                  <option value="Afghanistan" />
                  <option value="Albania" />
                  <option value="Algeria" />
                  <option value="American Samoa" />
                  <option value="Andorra" />
                  <option value="Angola" />
                  <option value="Anguilla" />
                  <option value="Antarctica" />
                  <option value="Antigua and Barbuda" />
                  <option value="Argentina" />
                  <option value="Armenia" />
                  <option value="Aruba" />
                  <option value="Australia" />
                  <option value="Austria" />
                  <option value="Azerbaijan" />
                  <option value="Bahamas" />
                  <option value="Bahrain" />
                  <option value="Bangladesh" />
                  <option value="Barbados" />
                  <option value="Belarus" />
                  <option value="Belgium" />
                  <option value="Belize" />
                  <option value="Benin" />
                  <option value="Bermuda" />
                  <option value="Bhutan" />
                  <option value="Bolivia" />
                  <option value="Bosnia and Herzegovina" />
                  <option value="Botswana" />
                  <option value="Bouvet Island" />
                  <option value="Brazil" />
                  <option value="British Indian Ocean Territory" />
                  <option value="Brunei Darussalam" />
                  <option value="Bulgaria" />
                  <option value="Burkina Faso" />
                  <option value="Burundi" />
                  <option value="Cambodia" />
                  <option value="Cameroon" />
                  <option value="Canada" />
                  <option value="Cape Verde" />
                  <option value="Cayman Islands" />
                  <option value="Central African Republic" />
                  <option value="Chad" />
                  <option value="Chile" />
                  <option value="China" />
                  <option value="Christmas Island" />
                  <option value="Cocos (Keeling) Islands" />
                  <option value="Colombia" />
                  <option value="Comoros" />
                  <option value="Congo" />
                  <option value="Congo, The Democratic Republic of The" />
                  <option value="Cook Islands" />
                  <option value="Costa Rica" />
                  <option value="Cote D'ivoire" />
                  <option value="Croatia" />
                  <option value="Cuba" />
                  <option value="Cyprus" />
                  <option value="Czech Republic" />
                  <option value="Denmark" />
                  <option value="Djibouti" />
                  <option value="Dominica" />
                  <option value="Dominican Republic" />
                  <option value="Ecuador" />
                  <option value="Egypt" />
                  <option value="El Salvador" />
                  <option value="Equatorial Guinea" />
                  <option value="Eritrea" />
                  <option value="Estonia" />
                  <option value="Ethiopia" />
                  <option value="Falkland Islands (Malvinas)" />
                  <option value="Faroe Islands" />
                  <option value="Fiji" />
                  <option value="Finland" />
                  <option value="France" />
                  <option value="French Guiana" />
                  <option value="French Polynesia" />
                  <option value="French Southern Territories" />
                  <option value="Gabon" />
                  <option value="Gambia" />
                  <option value="Georgia" />
                  <option value="Germany" />
                  <option value="Ghana" />
                  <option value="Gibraltar" />
                  <option value="Greece" />
                  <option value="Greenland" />
                  <option value="Grenada" />
                  <option value="Guadeloupe" />
                  <option value="Guam" />
                  <option value="Guatemala" />
                  <option value="Guinea" />
                  <option value="Guinea-bissau" />
                  <option value="Guyana" />
                  <option value="Haiti" />
                  <option value="Heard Island and Mcdonald Islands" />
                  <option value="Holy See (Vatican City State)" />
                  <option value="Honduras" />
                  <option value="Hong Kong" />
                  <option value="Hungary" />
                  <option value="Iceland" />
                  <option value="India" />
                  <option value="Indonesia" />
                  <option value="Iran, Islamic Republic of" />
                  <option value="Iraq" />
                  <option value="Ireland" />
                  <option value="Israel" />
                  <option value="Italy" />
                  <option value="Jamaica" />
                  <option value="Japan" />
                  <option value="Jordan" />
                  <option value="Kazakhstan" />
                  <option value="Kenya" />
                  <option value="Kiribati" />
                  <option value="Korea, Democratic People's Republic of" />
                  <option value="Korea, Republic of" />
                  <option value="Kuwait" />
                  <option value="Kyrgyzstan" />
                  <option value="Lao People's Democratic Republic" />
                  <option value="Latvia" />
                  <option value="Lebanon" />
                  <option value="Lesotho" />
                  <option value="Liberia" />
                  <option value="Libyan Arab Jamahiriya" />
                  <option value="Liechtenstein" />
                  <option value="Lithuania" />
                  <option value="Luxembourg" />
                  <option value="Macao" />
                  <option value="Macedonia, The Former Yugoslav Republic of" />
                  <option value="Madagascar" />
                  <option value="Malawi" />
                  <option value="Malaysia" />
                  <option value="Maldives" />
                  <option value="Mali" />
                  <option value="Malta" />
                  <option value="Marshall Islands" />
                  <option value="Martinique" />
                  <option value="Mauritania" />
                  <option value="Mauritius" />
                  <option value="Mayotte" />
                  <option value="Mexico" />
                  <option value="Micronesia, Federated States of" />
                  <option value="Moldova, Republic of" />
                  <option value="Monaco" />
                  <option value="Mongolia" />
                  <option value="Montserrat" />
                  <option value="Morocco" />
                  <option value="Mozambique" />
                  <option value="Myanmar" />
                  <option value="Namibia" />
                  <option value="Nauru" />
                  <option value="Nepal" />
                  <option value="Netherlands" />
                  <option value="Netherlands Antilles" />
                  <option value="New Caledonia" />
                  <option value="New Zealand" />
                  <option value="Nicaragua" />
                  <option value="Niger" />
                  <option value="Nigeria" />
                  <option value="Niue" />
                  <option value="Norfolk Island" />
                  <option value="Northern Mariana Islands" />
                  <option value="Norway" />
                  <option value="Oman" />
                  <option value="Pakistan" />
                  <option value="Palau" />
                  <option value="Palestinian Territory, Occupied" />
                  <option value="Panama" />
                  <option value="Papua New Guinea" />
                  <option value="Paraguay" />
                  <option value="Peru" />
                  <option value="Philippines" />
                  <option value="Pitcairn" />
                  <option value="Poland" />
                  <option value="Portugal" />
                  <option value="Puerto Rico" />
                  <option value="Qatar" />
                  <option value="Reunion" />
                  <option value="Romania" />
                  <option value="Russian Federation" />
                  <option value="Rwanda" />
                  <option value="Saint Helena" />
                  <option value="Saint Kitts and Nevis" />
                  <option value="Saint Lucia" />
                  <option value="Saint Pierre and Miquelon" />
                  <option value="Saint Vincent and The Grenadines" />
                  <option value="Samoa" />
                  <option value="San Marino" />
                  <option value="Sao Tome and Principe" />
                  <option value="Saudi Arabia" />
                  <option value="Senegal" />
                  <option value="Serbia and Montenegro" />
                  <option value="Seychelles" />
                  <option value="Sierra Leone" />
                  <option value="Singapore" />
                  <option value="Slovakia" />
                  <option value="Slovenia" />
                  <option value="Solomon Islands" />
                  <option value="Somalia" />
                  <option value="South Africa" />
                  <option value="South Georgia and The South Sandwich Islands" />
                  <option value="Spain" />
                  <option value="Sri Lanka" />
                  <option value="Sudan" />
                  <option value="Suriname" />
                  <option value="Svalbard and Jan Mayen" />
                  <option value="Swaziland" />
                  <option value="Sweden" />
                  <option value="Switzerland" />
                  <option value="Syrian Arab Republic" />
                  <option value="Taiwan, Province of China" />
                  <option value="Tajikistan" />
                  <option value="Tanzania, United Republic of" />
                  <option value="Thailand" />
                  <option value="Timor-leste" />
                  <option value="Togo" />
                  <option value="Tokelau" />
                  <option value="Tonga" />
                  <option value="Trinidad and Tobago" />
                  <option value="Tunisia" />
                  <option value="Turkey" />
                  <option value="Turkmenistan" />
                  <option value="Turks and Caicos Islands" />
                  <option value="Tuvalu" />
                  <option value="Uganda" />
                  <option value="Ukraine" />
                  <option value="United Arab Emirates" />
                  <option value="United Kingdom" />
                  <option value="United States" />
                  <option value="United States Minor Outlying Islands" />
                  <option value="Uruguay" />
                  <option value="Uzbekistan" />
                  <option value="Vanuatu" />
                  <option value="Venezuela" />
                  <option value="Viet Nam" />
                  <option value="Virgin Islands, British" />
                  <option value="Virgin Islands, U.S" />
                  <option value="Wallis and Futuna" />
                  <option value="Western Sahara" />
                  <option value="Yemen" />
                  <option value="Zambia" />
                  <option value="Zimbabwe" />
                </datalist>
              <button id='searchForCountryButton' type='submit' onClick={handleCountrySearch}>Go!</button>
            </div>
            </label>
          </div>
          <div className='navbarBoxes'>
            <Favorites toggle={toggleNavbar}/>
            <button className='navbarOpen' type='button' onClick={toggleNavbarFavBtn}>Expand</button>
          </div>
          <div className='navbarBoxes'>
            <Analytics toggle={toggleNavbar}/>
            <button className='navbarOpen' type='button' onClick={toggleNavbarGlobalBtn}>Expand</button>
          </div>
        </div>
        { isOpen && mode === 'global' ?
          <div className='navbarLower'>
            <DataBox data={metadata}></DataBox>
            <button className='navbarCloseBtn' type='button' onClick={handleCloseButton}>Close</button>
          </div>
        : isOpen && mode === 'favorites' ?
          <div className='navbarLower'>
            <FavoriteBox favorites={favorites}></FavoriteBox>
          <button className='navbarCloseBtn' type='button' onClick={handleCloseButton}>Close</button>
      </div>
        :
        <div className='navBarUpper'>
        </div>}
      </div>
    </div>
  )
}

export default NavBar
