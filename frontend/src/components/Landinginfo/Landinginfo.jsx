import React from 'react';
import './Landinginfo.css';

const Landinginfo = () => {
    return (
        <section className="info-section">
          <div className="info-container">
            <div className="info-content">
              
              <p>Discover Your Dream Getaway</p>
              <p>
                At VacationVerse, we believe that every traveler deserves an exceptional experience. 
                Our platform connects you with an array of exquisite properties, offering you the perfect 
                setting for your next vacation. Whether you're seeking a cozy cabin in the mountains, a
                luxurious beachfront villa, or a charming city apartment, we have the ideal accommodation
                for you.
              </p>
              <p>
                Our user-friendly interface allows you to browse through a curated selection of properties,
                read detailed descriptions, view high-quality photos, and easily make bookings. 
                With VacationVerse, you can embark on unforgettable journeys, create cherished memories,
                and indulge in the art of relaxation.
              </p>
             
            </div>
          </div>
          <div className="map-container">
          <div class="mapouter"><div class="gmap_canvas"><iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=690&amp;height=415&amp;hl=en&amp;q=The Oberoi Bengaluru&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://gachanox.io/">Gacha Nox APK</a></div></div>
          </div>
        </section>
      );
};

export default Landinginfo;
