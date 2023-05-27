import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GlobalContextProvider } from './context'
import About from './components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GlobalContextProvider>
      <div className="App">
        <h1>Welocome to Vite + React</h1>
        <About />
      </div>
    </GlobalContextProvider>
  )
}

export default App
