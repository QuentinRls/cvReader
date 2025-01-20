import React from 'react';
import './App.css';
import CvReader from '../src/cvReader';

function App() {
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