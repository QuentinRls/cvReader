import { useState } from 'react';

const useFileHandler = () => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileURL(null);
  };

  return { file, fileURL, handleFileChange, clearFile };
};

export default useFileHandler;