// Import necessary hooks and components from React, React Router, and other libraries
import React, { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import Lottie from 'react-lottie';
import animationData1 from '../../assets/upload.json';
// Ensure the correct path to your CSS file
import '/Users/aditiakhauri/Desktop/Upload/new/Frontend/src/components/pagesCSS/UploadCSS.css';
import Footer from '../inc/footer';

// Define Lottie animation options
const defaultOptions1 = {
  loop: true,
  autoplay: true, 
  animationData: animationData1,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

// Upload component
const Upload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  // Function to handle file drop
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setFiles([{
        ...file,
        preview: URL.createObjectURL(file)
      }]);
    }
  }, []);

  // Function to simulate form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAnalyzing(true);
    setShowModal(true);
    setResult("Image analysis result here");
  };

  // Function to handle cancelation
  const handleCancel = () => {
    setAnalyzing(false);
  };

  // Function to handle adding to blockchain (placeholder)
  const handleAddToBlockchain = () => {
    console.log("Adding to blockchain...");
  };

  // Function to close modal and navigate
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/dashboard');
  };

  // Enhanced re-upload function with transition effect
  const handleReUpload = () => {
    setIsPreviewVisible(false); // Start the transition
    setTimeout(() => {
      setFiles([]); // Clears out the current files state after the transition
      setIsPreviewVisible(true); // Reset visibility for next upload
    }, 300); // Delay in milliseconds matching the CSS transition
  };

  // Dropzone setup
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="upload-container">
      {/* Navigation and Lottie animation */}
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        {files.length === 0 && (
          <>
            <Lottie options={defaultOptions1} height={200} width={200} />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the images here ...</p>
            ) : (
              <p>Drag 'n' drop some images here, or click to select images</p>
            )}
          </>
        )}

        {/* Preview uploaded image with transition */}
        {files.map(file => (
          <div key={file.name} className={`preview-image ${!isPreviewVisible ? 'hidden' : ''}`}>
            <img src={file.preview} alt="Preview" />
            <p>{file.name}</p>
          </div>
        ))}

        {/* Analyze and Re-upload Image buttons */}
        {files.length > 0 && (
          <div className="button-group">
            <button onClick={handleSubmit} className="submit-button">Analyze Image</button>
            <button onClick={handleReUpload} className="submit-button">Re-upload Image</button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Upload;
