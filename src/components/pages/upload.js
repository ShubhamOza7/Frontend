import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../inc/navigation";
import Footer from "../inc/footer";
import "../pagesCSS/UploadCSS.css";
import { sendDataToBackend } from "../inc/apiService";

const ImageUploadComponent = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          setShowModal(true);
        }
        return Math.min(prevProgress + 10, 100);
      });
    }, 200);

    const formData = new FormData();
    formData.append("image", selectedFile);
  
    try {
      const data = await sendDataToBackend("classify", formData); // Make sure this endpoint is correct
      setResult(data.message);
      // Handle the response data as needed
    } catch (error) {
      console.error("Failed to send data:", error);
      // Handle the error appropriately
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setProgress(0);
    setSelectedImage(null);
    setSelectedFile(null);
    navigate("/dashboard");
  };

  return (
    <>
      <Navigation />
      <div className="upload-container">
        <h1 className="upload-heading">Upload Your Brain Scan</h1>
        <div className="upload-box">
          <form onSubmit={handleSubmit} className="upload-form">
            {selectedImage ? (
              <>
                <img src={selectedImage} alt="Preview" className="image-preview" />
                <button type="button" onClick={() => setSelectedImage(null)}>Reupload Image</button>
              </>
            ) : (
              <label className="upload-label">
                <span className="upload-text">Select an Image to Upload</span>
                <input type="file" onChange={handleImageChange} className="upload-input" />
              </label>
            )}
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            {selectedImage && <button type="submit" className="submit-btn">Analyze Image</button>}
          </form>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>&times;</span>
              <p>{result}</p>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ImageUploadComponent;
