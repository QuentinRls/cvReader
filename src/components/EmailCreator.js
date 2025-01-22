import React, { useState } from 'react';
import Loader from './loader';
import { loaderColorsRed } from '../ressources/ColorVar';
import FileUploader from './FileUploader';
import formatResult from './formatResult';
import '../styling/EmailCreator.css';

const EmailCreator = ({ onResult, onClear }) => {
    const [loading, setLoading] = useState(false);
    const [cvFile, setCvFile] = useState(null);
    const [cvFileURL, setCvFileURL] = useState(null);
    const [jobPosition, setJobPosition] = useState("");
    const [result, setResult] = useState(null);
    const [isRefusal, setIsRefusal] = useState(false);

    const handleCvFileChange = (event) => {
        const file = event.target.files[0];
        setCvFile(file);
        setCvFileURL(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!cvFile) {
            alert("Veuillez télécharger un fichier PDF.");
            return;
        }
        if (!jobPosition) {
            alert("Veuillez renseigner le poste recherché.");
            return;
        }

        const formData = new FormData();
        formData.append('cvFile', cvFile);
        formData.append("jobPosition", jobPosition);
        formData.append("isRefusal", isRefusal);
        console.log(isRefusal);
        setLoading(true);

        try {
            const response = await fetch("https://mywebsiteserver-s92a.onrender.com/emailCreator", {
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
        setJobPosition("");
        setCvFile(null);
        setCvFileURL(null);
        setResult(null);
        setIsRefusal(false);
        if (onClear) {
            onClear();
        }
    };

    const handleCopy = () => {
        const resultText = document.querySelector('.result-boxes').innerText;
        navigator.clipboard.writeText(resultText).then(() => {
            alert('Texte copié dans le presse-papiers');
        }).catch(err => {
            console.error('Erreur lors de la copie du texte :', err);
        });
    };

    return (
        <>
            <Loader loading={loading} colors={loaderColorsRed} />
            {!loading && !result && (
                <>
                    <div className="toggle-container">
                        <p className='interviewText'>Prise de rendez vous</p>
                        <div className="email-creator">
                            <input
                                className="toggle"
                                type="checkbox"
                                checked={isRefusal}
                                onChange={() => setIsRefusal(!isRefusal)}
                            />
                        </div>
                        <p className='interviewText'>Refus</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='images-container'>
                            <FileUploader
                                id="fileInput"
                                name="cvFile"
                                label="Cliquez pour télécharger ou glissez et déposez le CV du candidat ici"
                                accept=".pdf"
                                file={cvFile}
                                fileURL={cvFileURL}
                                handleFileChange={handleCvFileChange}
                                previewType="pdf"
                                color="#eb50509e"
                                hoverBackgroundColor="#411e2dcc"
                            />
                        </div>
                        <div className='input-container'>
                            <input className="basic-slide" id="jobPosition" type="text" placeholder=" " value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} />
                            <label htmlFor="jobPosition" style={{ borderRadius: "20px 0px 0px 20px" }}>Poste</label>
                        </div>
                        <div className='sendEmailContainer'>
                            <button className="sendEmailButton" type="submit" disabled={loading}>
                                {loading ? 'Envoi en cours...' : 'Envoyer'}
                            </button>
                        </div>
                    </form>
                </>
            )}
            {result && (<>
                <div className="result-containerEmail">
                    <div className="result-boxes">{formatResult(result)}</div>
                    <button className="copyBtn" onClick={handleCopy}>Copier</button>
                </div>
                <div className='clearBtnContainer'>
                    <button className="clearBtn" onClick={handleClear}>Réinitialiser</button>
                </div>
            </>
            )}
        </>
    );
}

export default EmailCreator;