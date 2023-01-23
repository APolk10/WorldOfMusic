import React from 'react'
import { createRoot } from 'react-dom/client'
import Map from './components/map.jsx'

function App () {
  return (
    <div>
      <h1>World of Music</h1>
      <Map />
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

export default App
