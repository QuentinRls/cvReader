import React, { useState } from 'react';
import cvIcon from '../icon/CvIcon.png';
import EmailIcon from '../icon/EmailIcon.png';
import CvReader from './CvReader';
import EmailCreator from './EmailCreator';
import '../styling/Menu.css';

const Menu = ({ onMenuItemClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMenuItemClick = (component, backgroundColor, waveColor) => {
    onMenuItemClick(component, backgroundColor, waveColor);
    setIsChecked(false); // Close the menu
  };

  return (
    <div className="menu-container">
      <div className="grid">
        <div className={`menu cross menu--1 ${isChecked ? 'active' : ''}`}>
          <label>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <svg className='svgClass'>
              <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
              <path className="line--2" d="M0 50h70" />
              <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
            </svg>
          </label>
          <div className="menu-items">
            <div className="menu-item" onClick={() => handleMenuItemClick(<EmailCreator />, 'linear-gradient(315deg, rgb(255, 204, 229) 3%, rgb(77, 49, 63) 38%, rgb(95, 33, 64) 68%, rgb(85, 19, 52) 98%)', 'rgb(255, 204, 229)', 'rgb(255 255 255 / 25%)')}>
              <img className="menu-icon" alt='cv' src={EmailIcon} />
            </div>
            <div className="menu-item" onClick={() => handleMenuItemClick(<CvReader />, 'linear-gradient(315deg, rgb(11, 64, 73) 3%, rgb(7, 58, 58) 38%, rgb(15, 70, 80) 68%, rgba(26, 81, 95, 0.39) 98%)', 'rgb(10, 55, 63)', 'rgb(255 255 255 / 25%)')}>
              <img className="menu-icon" alt='histoire' src={cvIcon} />
            </div>
            {/* <div className="menu-item" onClick={() => handleMenuItemClick(<CvReader />, 'linear-gradient(315deg, rgb(128, 110, 94) 3%, rgb(97, 76, 58) 38%, rgb(100, 68, 42) 68%, rgb(95, 55, 22) 98%)', 'rgb(255, 229, 204)', 'rgba(204, 255, 204, 0.25)')}>
              <img className="menu-icon" alt='arbre' src={cvIcon} />
            </div>
            <div className="menu-item" onClick={() => handleMenuItemClick(<CvReader />, 'linear-gradient(315deg, rgb(87, 87, 105) 3%, rgb(54, 54, 87) 38%, rgb(40, 40, 104) 68%, rgb(15, 15, 83) 98%)', 'rgb(204, 204, 255)', 'rgba(204, 204, 255, 0.25)')}>
              <img className="menu-icon" alt='memoire' src={cvIcon} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;