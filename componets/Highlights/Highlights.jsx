import React from 'react'
import './Highlights.css'

const Highlights = ({ title, icon, description ,title2, icon2, description2 }) => {
  return (
    <div className='weather'>
    <div className="weather-highlight">
    <div>
      <div className="highlight-description">{description}</div>
      <div className="highlight-icon">{icon}</div>
      <div className="highlight-title">{title}</div>
      </div>

      <div>
      <div className="highlight-description">{description2}</div>
      <div className="highlight-icon">{icon2}</div>
      <div className="highlight-title">{title2}</div>
      
    </div>


    </div>
    
  

    </div>
  )
}

export default Highlights