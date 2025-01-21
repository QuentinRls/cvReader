import React from 'react';
import "../styling/FileUploader.css";

const FileUploader = ({ id, name, label, accept, file, fileURL, handleFileChange, previewType, required }) => {
    return (
        <div className="upload-box">
            <label htmlFor={id}>
                {label}
                <br />
                <span>{file ? "" : accept.replace(/,/g, ' / ')}</span>
            </label>
            <input
                id={id}
                name={name}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                required={required}
            />
            {fileURL && (
                <div className={previewType === 'pdf' ? "pdf-preview" : "image-preview"}>
                    {previewType === 'pdf' ? (
                        <iframe
                            src={fileURL}
                            width="100%"
                            height="500px"
                            title="Aperçu du fichier"
                        ></iframe>
                    ) : (
                        <img src={fileURL} alt="Aperçu du fichier" width="100%" />
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUploader;