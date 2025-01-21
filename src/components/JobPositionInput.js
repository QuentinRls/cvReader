import React from "react";
import "../styling/JobPositionInput.css";

const JobPositionInput = ({ jobPosition, setJobPosition }) => {
    return (
      <div className="job-box">
        <label htmlFor="jobPosition" className="form-label">
          Poste recherché (optionnel) :
        </label>
        <textarea
          id="jobPosition"
          type="text"
          placeholder="Entrez le poste recherché (ex : Développeur Web)"
          value={jobPosition}
          onChange={(e) => setJobPosition(e.target.value)}
        />
      </div>
    );
  };
  export default JobPositionInput;