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
        <p>
        <span>Welcome to VacationVerse </span> Experience the world with us and let VacationVerse be your guide to extraordinary getaways.
        </p>
      <AliceCarousel autoPlay autoPlayInterval={2500} infinite={true}>
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
      <div className="landing-info-container">
        <Landinginfo />
      </div>
      <Footer/>
    </div>
  );
}
