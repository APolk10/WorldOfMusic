import * as React from 'react'
import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import CountryInfo from './components/countryInfo'
import HexMap from './components/hexMap'
import Map from './components/map'
import NavBar from './components/navBar'
import Footer from './components/footer'
import Login from './components/login'

const App: React.FC = () => {
  const[user, setUser] = useState('');
  const[mode, setMode] = useState('standard');
  const[countryArtists, setCountryArtists] = useState([]);
  const[nameOfCountry, setNameOfCountry] = useState('');

  const handleModeButtonClick = (e: any):void => {
    setMode(e.target.value);
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(e.target.value);
  }

  const handleCountrySelection = (dataFromAPI: { artists: [] }, countryName: string) => {
    setCountryArtists(dataFromAPI.artists);
    setNameOfCountry(countryName);
  }

  const checkUsername = (username: string) => {
    console.log(username);
    // axios post request for username/session creation.
  }

  useEffect(() => {
    axios.get('http://localhost:3001/')
    // if no user is found via the cookie -> session interaction, prompt
      .then((data) => console.log('express returns this from sessionData', data));
    axios.get('http://localhost:3001/getGlobalAnalytics')
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <>
    { user ?
      <div className="container">
        <NavBar onSearchChange={onSearchChange}/>
        <div>
          <h1 className='title'>World of Music</h1>
          <div className='mode-buttons'>
            <button className='mode-button' onClick={handleModeButtonClick} value="solid">Mono Color with Borders</button>
            <button className='mode-button' onClick={handleModeButtonClick} value="hex">Hex Patter with Random Colors!</button>
          </div>
          <CountryInfo countryArtists={countryArtists} nameOfCountry={nameOfCountry} />
          {mode === 'hex' ? <HexMap handleCountrySelection={handleCountrySelection} /> : <Map handleCountrySelection={handleCountrySelection} />}
        </div>
        <Footer />
      </div> : <Login checkUser={checkUsername}/>}
  </>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

export default App
