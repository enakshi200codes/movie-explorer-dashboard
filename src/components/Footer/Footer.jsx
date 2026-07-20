import React from 'react'
import './Footer.css'
import linkedin_icon from '../../assets/linkedin_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import github_icon from '../../assets/github_icon.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={linkedin_icon} alt="" />
        <img src={instagram_icon} alt="" />
        <img src={github_icon} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preference</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>&copy; 2023 Netflix. All rights reserved.</p>
    </div>
  )
}

export default Footer
