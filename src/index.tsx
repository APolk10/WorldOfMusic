import React from 'react'
import { createRoot } from 'react-dom/client'
import NavBar from './components/navBar'
import Map from './components/map'
import Analytics from './components/analytics'

function App () {
  return (
    <div className="container">
      <NavBar />
      <div>
        <h1 className='title'>World of Music</h1>
        <Map />
        <Analytics />
      </div>

    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

export default App
