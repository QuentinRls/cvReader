import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Loader from '../src/loader'; // Assurez-vous de créer un composant Loader
import './cvReader.css'; // Assurez-vous de créer un fichier CSS pour le style

function CvReader({ onResult, onClear }) {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [jobPosition, setJobPosition] = useState("");
  const [missionFile, setMissionFile] = useState(null);
  const [missionFileURL, setMissionFileURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
    }
  };

  const handleMissionFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setMissionFile(selectedFile);
      setMissionFileURL(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Veuillez télécharger un fichier PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("cvFile", file);
    formData.append("jobPosition", jobPosition);
    if (missionFile) {
      formData.append("missionFile", missionFile);
    }

    setLoading(true);

    try {
      const response = await fetch("https://mywebsiteserver-s92a.onrender.com/upload-cv2", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data); // Set the result locally
      onResult(data); // Pass the result to the parent component if needed
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setFileURL(null);
    setJobPosition("");
    setMissionFile(null);
    setMissionFileURL(null);
    setResult(null);
    if (onClear) {
      onClear();
    }
  };

  const formatResult = (data) => {
    if (!data || !data.analysis) return null;

    const lines = data.analysis.split("\n");
    const resultComponents = [];
    let currentBox = [];

    lines.forEach((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        if (currentBox.length > 0) {
          resultComponents.push(
            <div key={`box-${index}`} className="result-box">
              {currentBox}
            </div>
          );
          currentBox = [];
        }
        const title = line.slice(2, -2).trim();
        currentBox.push(
          <h2 key={index} className="result-title">
            {title}
          </h2>
        );
      } else if (line.startsWith("- ")) {
        currentBox.push(
          <li key={index} className="result-list-item">
            {line.slice(2).trim()}
          </li>
        );
      } else if (line.includes("%")) {
        const percentage = line.match(/\d+%/)[0];
        const value = parseInt(percentage, 10);
        currentBox.push(
          <div key={index} className="progress-bar-container">
            <CircularProgressbar
              value={value}
              text={`${percentage}`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: `rgba(127, 255, 212, ${value / 100})`,
                textColor: '#ffff',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
          </div>
        );
      } else {
        currentBox.push(
          <p key={index} className="result-paragraph">
            {line}
          </p>
        );
      }
    });

    if (currentBox.length > 0) {
      resultComponents.push(
        <div key={`box-${lines.length}`} className="result-box">
          {currentBox}
        </div>
      );
    }

    return resultComponents;
  };

  return (
    <div className="form-container">
      <h1>Évaluateur CV / Mission par IA</h1>
      {result && (
        <div className="result-container">
          <div className="result-boxes">{formatResult(result)}</div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className='images-container'>
          {!fileURL && (
            <div className="upload-box">
              <label htmlFor="fileInput">
                Cliquez pour télécharger ou glissez et déposez votre CV ici
                <br />
                <span>{file ? "" : "PDF ou DOCX"}</span>
              </label>
              <input
                id="fileInput"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                required
              />
            </div>
          )}
          {fileURL && (
            <div className="pdf-preview">
              <iframe
                src={fileURL}
                width="100%"
                height="500px"
                title="Aperçu du CV"
              ></iframe>
            </div>
          )}
          vs
          <div className="upload-box">
            <input
              id="missionFile"
              type="file"
              accept="image/*"
              onChange={handleMissionFileChange}
            />
            <label htmlFor="missionFile">
              Cliquez pour télécharger ou glissez et déposez votre mission ici
              <br />
              <span>{file ? "" : "JPEG / PNG / PDF"}</span>
            </label>
            {missionFileURL && (
              <div className="image-preview">
                <img src={missionFileURL} alt="Aperçu de la mission" width="100%" />
              </div>
            )}
          </div>
        </div>
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
        <div className="button-container">
          <button type="submit" className="analyze-btn" disabled={loading}>
            {loading ? <Loader /> : "Comparer le CV a la mission"}
          </button>
          <button onClick={handleClear} className="clear-btn" disabled={!file && !missionFile}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default CvReader;  