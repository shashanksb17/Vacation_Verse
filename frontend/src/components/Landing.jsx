import React from "react";
import "./Landing.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'
import image4 from '../assets/4.jpg'
import Landinginfo from "./Landinginfo/Landinginfo";
import Footer from "./Footer/Footer";

export default function LandingPage() {
  return (
    <div className="App">
        <div className="landing-info-container">
        <Landinginfo />
      </div>
      <AliceCarousel autoPlay autoPlayInterval={3000} infinite={true}>
        <div className="sliderimg-container">
          <img src={image1} className="sliderimg" alt=""/>
        </div>
        <div className="sliderimg-container">
          <img src={image2} className="sliderimg" alt=""/>
        </div>
        <div className="sliderimg-container">
          <img src={image3} className="sliderimg" alt=""/>
        </div>
        <div className="sliderimg-container">
          <img src={image4} className="sliderimg" alt=""/>
        </div>
      </AliceCarousel>
      <Footer/>
    </div>
  );
}
