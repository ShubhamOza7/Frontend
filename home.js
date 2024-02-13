import React from 'react';
import Navigation from "../inc/navigation";
import Footer from "../inc/footer";
import "../pagesCSS/HomeCSS.css";
import Lottie from 'react-lottie';
import home from '../../assets/home.png'
import animationData1 from '../../assets/upload.json'; // Your animation file for step 1
import animationData2 from '../../assets/analyze.json'; // Your animation file for step 2
import animationData3 from '../../assets/blockchain.json'; // Your animation file for step 3
import { Link } from "react-router-dom";

// Define Lottie options for each animation data
const defaultOptions1 = {
  loop: true,
  autoplay: true, 
  animationData: animationData1,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const defaultOptions2 = {
  loop: true,
  autoplay: true, 
  animationData: animationData2,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const defaultOptions3 = {
  loop: true,
  autoplay: true, 
  animationData: animationData3,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Home = () => {
  const items = [
    {
      id: 1,
      headline: "Upload Brain Scan Image",
      text: "Upload the brain scan image using the designated upload icon",
      lottieOptions: defaultOptions1
    },
    {
      id: 2,
      headline: "Submit for Analysis",
      text: "Submit the uploaded image to receive results by clicking on the Analyse Image icon.",
      lottieOptions: defaultOptions2
    },
    {
      id: 3,
      headline: "Store in Blockchain",
      text: "To ensure future verification, click the icon to add the records to our blockchain.",
      lottieOptions: defaultOptions3
    },
  ];

  return (
    <div className="home-container">
      <Navigation />
      <div className="banner">
  <div className="banner-content">
    <div className="banner-text">
      <p>This demonstration is a forward-thinking solution that leverages blockchain technology to revolutionize the storage,
      security, and accessibility of medical diagnostic information, providing a more trustworthy and streamlined healthcare
      experience.</p>
    </div>
    <div className="banner-image">
      <img src={home} alt="Blockchain Technology Visualization" />
    </div>
  </div>
</div>


        <div className="process-steps">
        {items.map((item) => (
          <div key={item.id} className="step-card">
            <div className="step-header">
              <Lottie options={item.lottieOptions} height={100} width={100} />
              <div>
               
                <h2 className="step-headline">{item.id}. {item.headline}</h2>
              </div>
            </div>
            <p className="step-text">{item.text}</p>
          </div>
        ))}
      </div>



      <div class="line-container">
        <hr class="styled-line" />
      </div>


      
      
      <Footer />
    </div>
  );
};

export default Home;
