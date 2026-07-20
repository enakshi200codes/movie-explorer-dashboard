import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import Search from './pages/Search/search'
import Watchlist from './pages/Watchlist/Watchlist';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
        if(user) {
          console.log("Logged In!");
          if(window.location.pathname === "/login") {
            navigate("/");
          }
        }
        else {
          console.log("Logged Out!")
          navigate('/login');
        }
    })
  },[])

  return (
    <div>
       <ToastContainer theme='dark'/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/player/:id' element={<Player/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/watchlist" element={<Watchlist/>}/>
      </Routes>
    </div>
  )
}

export default App
