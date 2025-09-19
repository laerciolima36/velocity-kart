import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Aluguel from './pages/Aluguel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Aluguel />
    </>
  )
}

export default App
