import * as React from 'react'
import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import NavBar from './components/navBar'
import Map from './components/map'
import HexMap from './components/hexMap'
import Analytics from './components/analytics'

const App: React.FC = () => {
  const[mode, setMode] = useState('standard');

  const handleModeButtonClick = (e: any):void => {
    console.log(e.target.value);
    setMode(e.target.value);
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(e.target.value);
  }

  return (
    <div className="container">
      <NavBar onSearchChange={onSearchChange}/>
      <div>
        <h1 className='title'>World of Music</h1>
        <div className='mode-buttons'>
          <button className='mode-button' onClick={handleModeButtonClick} value="solid">MonoColor With Borders</button>
          <button className='mode-button' onClick={handleModeButtonClick} value="hex">Hex Patter with Random Colors!</button>
        </div>
        {mode === 'hex' ? <HexMap /> : <Map />}
        <Analytics />
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

export default App
