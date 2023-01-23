import React from 'react'
import { createRoot } from 'react-dom/client'
import NavBar from './components/navBar.jsx'
import Map from './components/map.jsx'
import Analytics from './components/analytics.jsx'

function App () {
  return (
    <div className="container">
      <h1>World of Music</h1>
      <NavBar />
      <Map />
      <Analytics />
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

export default App
