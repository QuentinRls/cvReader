import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';
import CvReader from '../src/cvReader';
import { trackPageView } from './analytics';

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  const handleResult = (data) => {
    console.log("Résultat de l'analyse :", data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <CvReader onResult={handleResult} />
      </header>
    </div>
  );
}

export default App;