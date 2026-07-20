import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar' 
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import add_icon from '../../assets/add_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <div className="hero-btns">
            <a href="https://youtu.be/b9EkMc79ZSU?si=mar2dOq08Y7Wm1ma">
              <button className="play-btn"> 
              <img src={play_icon} alt="" />
              Play
            </button>
            </a>
            <button className="btn dark-btn">
              <img src={add_icon} alt="" />
              My List
            </button>
          </div>
          <p>
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
          </p>
        </div>
        <TitleCards/>
      </div>  
      <div className="more-cards">
        <TitleCards title={"Popular on Netflix"} category={"popular"}/>
        <TitleCards title={"Top Picks For You"} category={"top_rated"}/>
        <TitleCards title={"Upcoming Only on Netflix"} category={"upcoming"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
