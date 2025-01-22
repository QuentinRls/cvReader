import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import CvReader from './components/CvReader';
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState(<CvReader />);
  const [background, setBackground] = useState('rgb(10, 55, 63)');
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(315deg, rgb(11, 64, 73) 3%, rgb(7, 58, 58) 38%, rgb(15, 70, 80) 68%, rgba(26, 81, 95, 0.39) 98%)');
  const [waveColor, setWaveColor] = useState('rgb(255 255 255 / 25%)');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.body.style.background = backgroundColor;
    document.body.style.backgroundColor = background;;
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradient 10s ease infinite';
    document.body.style.backgroundAttachment = 'fixed';
  }, [backgroundColor, background]);

  const handleMenuItemClick = (component, backgroundColor, background, waveColor) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveComponent(component);
      setBackgroundColor(backgroundColor);
      setBackground(background);
      setWaveColor(waveColor);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="App" style={{backgroundSize: '400% 400%', animation: 'gradient 10s ease infinite', backgroundAttachment: 'fixed' }}>
      <header className="App-header">
        <Menu onMenuItemClick={handleMenuItemClick} />
      </header>
      <div className={`component-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        {activeComponent}
      </div>
      <div className="wave" style={{ background: waveColor }}></div>
      <div className="wave" style={{ background: waveColor }}></div>
      <div className="wave" style={{ background: waveColor }}></div>
    </div>
  );
}

export default App;