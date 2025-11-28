import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/client/home/Home'
import HomeAdmin from './pages/admin/home_admin/HomeAdmin'
import BackgroundStars from './components/background/BackgroundStars'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthsProvider'


function App() {
  const { isLogin } = useContext(AuthContext)

  return (
    <>
      {isLogin?.role === "admin" ? <div style={{ position: "relative", minHeight: "100vh" }}>
        <BackgroundStars />
        <div style={{ position: "relative", zIndex: 1 }}>
          <HomeAdmin />
        </div>
      </div> : <div className=' relative z-1'>
        <Home />
      </div>}
    </>
  )
}

export default App;
