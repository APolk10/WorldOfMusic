import * as React from 'react';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import CountryInfo from './components/countryInfo';
import HexMap from './components/hexMap';
import Map from './components/map';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Login from './components/login';
import { countryToAlpha2 } from 'country-to-iso';

const App: React.FC = () => {
  const[username, setUsername] = useState('');
  const[invalidUsername, setInvalidUsername] = useState(false)
  const[profile, setProfile] = useState('');
  const[mode, setMode] = useState('standard');
  const[countryArtists, setCountryArtists] = useState([]);
  const[nameOfCountry, setNameOfCountry] = useState('');
  const[metadata, setMetadata] = useState([]);
  const[favorites, setFavorites] = useState([]);
  const[searchInput, setSearchInput] = useState('');
  const[countryClicked, setClicked] = useState();
  const[selectedCountry, setCountry] = useState({});

  // const URL = 'https://world-of-music.onrender.com';
  const URL = 'http://localhost:3001';

  const animation = 'flashSideBar 1s linear infinite';

  const handleModeButtonClick = (e: any):void => {
    setMode(e.target.value);
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setSearchInput(e.target.value);
  }

  const handleCountrySearch = () => {
    let countryISOCode = countryToAlpha2(searchInput);
    let countryName = searchInput;
    getCountryData(countryISOCode!, countryName)
  }

  const handleCountrySelection = (dataFromAPI: { artists: [] }, countryName: string) => {
    setCountryArtists(dataFromAPI.artists);
    setNameOfCountry(countryName);
  }

  const handlePolygonClick = (e: any) => {
    setClicked(e);
    let countryISOCode: string = e.properties.ISO_A2;
    let countryName = e.properties.BRK_NAME;
    getCountryData(countryISOCode, countryName);
  }

  const getCountryData = (countryISOCode: string, countryName: string) => {
    axios.get(`${URL}/getCountryData/${countryISOCode}`, { withCredentials: true })
    .then((res) => {
      setCountry(res.data)
      handleCountrySelection(res.data, countryName)
      document.getElementById('countryInfoContainer')!.style.animation = animation;
    });
    trackClick(countryISOCode, countryName);
  }

  const trackClick = (countryISOCode: string, countryName: string) => {
    axios.post(`${URL}/trackClick`, { country: countryName, iso: countryISOCode}, { withCredentials: true })
    .then((res: { data: {} }) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err))
  }

  const handleLogoutClick = () => {
    let currentURL = window.location.pathname;
    axios.post(`${URL}/logout`, { username: username }, { withCredentials: true })
      .then(() => {
        setUsername('')
        setProfile('')
        window.location.href = currentURL
      })
  }

  const checkUser = (username: string, pin: number) => {
    axios.post(`${URL}/existingUserLogin`,{ username: username, pin: pin }, { withCredentials: true })
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

  const createUser = (username: string, pin: number) => {
    axios.post(`${URL}/newUserLogin`, { username: username, pin: pin }, { withCredentials: true })
      .then((response) => {
        // assumes returned username
        if (response) {
          const user = response.data.username;
          setInvalidUsername(false);
          setUsername(user);
        }
      })
      .catch((reponse) => {
        // assumes username is taken
        console.log('error creating user');
      })
  }


  useEffect(() => {
    // check for existing session
    let returnedUsername = '';

    axios.get(`${URL}/checkCredentials`, { withCredentials: true })
      .then((response) => {
        if (response.data === 'no name found') {
          console.log('no name found in database');
        } else if (response.data !== 'unauthorized client') {
          let retrievedUsername = response.data;
          setUsername(retrievedUsername);
          setProfile(retrievedUsername);
          setInvalidUsername(false);
          // fetch favorites
          axios.post(`${URL}/getFavorites/${returnedUsername}`, { username: retrievedUsername }, { withCredentials: true })
          .then((response) => setFavorites(response.data))
          .catch((error) => console.log(error));

        } else {
          console.log('error checking credentials')
        }
    })
      .catch((error) => console.log('error from server when checking credentials', error))

    axios.get(`${URL}/getGlobalAnalytics`, { withCredentials: true })
      .then((response) => setMetadata(response.data))
      .catch((error) => console.log(error));

  }, [])

  return (
    <>
    { username ?
      <div className="container">
        <NavBar metadata={metadata} favorites={favorites} onSearchChange={onSearchChange} handleCountrySearch={handleCountrySearch}/>
        <div>
          <h1 className='title'>World of Music</h1>
          <div className='mode-buttons'>
            <button className='mode-button' onClick={handleModeButtonClick} value="solid">Drawn Polygons</button>
            <button className='mode-button' onClick={handleModeButtonClick} value="hex">Hexagons are the Bestagons!</button>
          </div>
          <CountryInfo username={username} countryArtists={countryArtists} nameOfCountry={nameOfCountry} />
          {mode === 'hex' ? <HexMap handleCountrySelection={handleCountrySelection} /> : <Map handleCountrySelection={handleCountrySelection} handlePolygonClick={handlePolygonClick} countryClicked={countryClicked}/>}
        </div>
        <Footer handleLogoutClick={handleLogoutClick}/>
      </div>
      // login feature if no username is set
      : <Login checkUser={checkUser} createUser={createUser} flag={invalidUsername} /> }
    </>
  )
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

export default App;
