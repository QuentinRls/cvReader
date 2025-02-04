import React, { useState } from 'react';
import FileUploader from './FileUploader';
import JobPositionInput from './JobPositionInput';
import ButtonContainer from './ButtonContainer';
import formatResult from './formatResult';
import useFileHandler from './UseFileHandler';
import { loaderColorsBlue } from '../ressources/ColorVar';
import "../styling/cvReader.css";
import Loader from './loader';

function CvReader({ onResult, onClear }) {
  const { file: cvFile, fileURL: cvFileURL, handleFileChange: handleCvFileChange, clearFile: clearCvFile } = useFileHandler();
  const { file: missionFile, fileURL: missionFileURL, handleFileChange: handleMissionFileChange, clearFile: clearMissionFile } = useFileHandler();
  const [jobPosition, setJobPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cvFile) {
      alert("Veuillez télécharger un fichier PDF.");
      return;
    }

    if (!missionFile && !jobPosition) {
      alert("Veuillez télécharger un fichier de mission ou remplir le poste recherché.");
      return;
    }

    const formData = new FormData();
    formData.append("cvFile", cvFile);
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
      setResult(data);
      onResult(data);
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearCvFile("");
    clearMissionFile("");
    setJobPosition("");
    setResult(null);
    if (onClear) {
      onClear();
    }
  };

  return (
    <>
      <Loader loading={loading ? true : false} colors={loaderColorsBlue}/>
      <h1 className={loading ? 'BlobTitle' : ''}>
        Bob le Blob, {loading ? "réfléchit... \ncela peux prendre jusqu'a 1 minute à la première utilisation" : "le comparateur de CV & Mission"}
      </h1>
      <div className="form-container">
        <>
          {result && (
            <div className="result-container">
              <div className="result-boxes">{formatResult(result)}</div>
            </div>
          )}
          {!loading ?
            <form onSubmit={handleSubmit} className="form">
              {!result && (
                <>
                  <div className='images-container'>
                    <FileUploader
                      id="fileInput"
                      name="cvFile"
                      label="Cliquez pour télécharger ou glissez et déposez votre CV ici"
                      accept=".pdf,.docx"
                      file={cvFile}
                      fileURL={cvFileURL}
                      handleFileChange={handleCvFileChange}
                      previewType="pdf"
                      color="#7fffd49e" 
                      borderColor="#7fffd49e" 
                      hoverBorderColor="#7fffd49e" 
                      hoverBackgroundColor="#232222" 
                    />
                    <FileUploader
                      id="missionFile"
                      name="missionFile"
                      label="Cliquez pour télécharger ou glissez et déposez votre mission ici"
                      accept="image/*"
                      file={missionFile}
                      fileURL={missionFileURL}
                      handleFileChange={handleMissionFileChange}
                      previewType="image"
                      required={false}
                      color="#7fffd49e" 
                      hoverBackgroundColor="#232222" 
                    />
                  </div>
                  <JobPositionInput
                    jobPosition={jobPosition}
                    setJobPosition={setJobPosition}
                  />
                </>
              )}
              <ButtonContainer
                loading={loading}
                handleClear={handleClear}
                file={cvFile}
                missionFile={missionFile}
                jobPosition={jobPosition}
              />
            </form> : <></>}
        </>
      </div>
    </>
  );
}

export default CvReader;
