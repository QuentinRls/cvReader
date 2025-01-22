import React from 'react';
import '../styling/ButtonContainer.css';

const ButtonContainer = ({ loading, handleClear, file, missionFile }) => {
  return (
    <div className="button-container">
      <button type="submit" className="analyze-btn" disabled={loading}>
        Comparer le CV à la mission
      </button>
      <button type="button" onClick={handleClear} className="clear-btn" disabled={!file && !missionFile}>
        Clear
      </button>
    </div>
  );
};

export default ButtonContainer;