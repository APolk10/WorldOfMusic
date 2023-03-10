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
  const[username, setUsername] = useState('');
  const[invalidUsername, setInvalidUsername] = useState(false)
  const[profile, setProfile] = useState('');
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

  const handleLogoutClick = () => {
    let currentURL = window.location.pathname;
    axios.post('http://localhost:3001/logout', { username: username }, { withCredentials: true })
      .then(() => {
        setUsername('')
        setProfile('')
        window.location.href = currentURL
      })
  }

  const checkUser = (username: string, pin: number) => {
    axios.post(`http://localhost:3001/login`,{ username: username, pin: pin }, { withCredentials: true })
    .then((response) => {
      let name = response.data;
      if (name === 'taken') {
        setInvalidUsername(true);
      } else {
        setInvalidUsername(false);
        setUsername(name);
      }
    })
    .catch((error) => console.log(error))
  }


  useEffect(() => {
    // check for existing session
    axios.get('http://localhost:3001/checkCredentials', { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'no name found') {
          console.log('no name found in database')
        } else if (response.data !== 'unauthorized client') {
          setUsername(response.data);
          setProfile(response.data);
          setInvalidUsername(false);
        } else {
          console.log('error checking credentials')
        }

    })
      .catch((error) => console.log('error from server', error))
    // get all metadata for site
    // axios.get('http://localhost:3001/getGlobalAnalytics', { withCredentials: true })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  }, [])

  return (
    <>
    { username ?
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
        <Footer handleLogoutClick={handleLogoutClick}/>
      </div> : <Login checkUserCredentials={checkUser} flag={invalidUsername} /> }
    </>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

export default App
