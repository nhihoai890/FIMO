import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeAdmin from './pages/admin/home_admin/HomeAdmin'
import BackgroundStars from './components/background/BackgroundStars'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <BackgroundStars />

       
        <div style={{ position: "relative", zIndex: 1 }}>
          <HomeAdmin />
        </div>
      </div>
    </>
  )
}

export default App
