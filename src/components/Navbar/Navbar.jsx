import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.png'
import bell_icon from '../../assets/bell_icon.png'
import profile_img from '../../assets/profile_img.jpg'
import caret_icon from '../../assets/caret_icon.png'
import app_grid from '../../assets/app_grid.svg'
import { logout } from '../../firebase'
import { useNavigate,useLocation } from 'react-router-dom'

const Navbar = () => {

  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
      } else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li className={location.pathname === "/"?"active":""}  onClick={() => navigate("/")}>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li className={location.pathname === "/watchlist"?"active":""}  onClick={() => navigate("/watchlist")}>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" onClick = {() => navigate("/search")}/>
        <img src={app_grid} alt="" className="icons grid-icon" />
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt=""/>
          <div className="dropdown">
            <p onClick={() => {logout()}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar