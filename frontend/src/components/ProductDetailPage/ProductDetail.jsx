// ProductDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const { Id } = useParams();

  const [data, setData] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');

  useEffect(() => {
    fetch(`https://expensive-newt-snaps.cyclic.app/properties/${Id}`)
      .then((res) => res.json())
      .then((data) => setData(data.properties))
      .catch((err) => console.log(err));
  }, [Id]);

  const handleBookButtonClick = (id,checkIn,checkOut,price,guests) => {
    // Prepare the data to send in the POST request
    if(checkIn==""||checkOut==""||price==""||guests==""){
        alert("Fill All Data")
      
    }else{
        const url = `/payment/${id}?checkIn=${checkIn}&checkOut=${checkOut}&price=${price}&guests=${guests}`;

            window.location.href = url;
    }
 
  };

  return (
    <div className='main'>
    <div className='product-info'>
      <h3>{data[0]?.name}</h3>
      <p>Rating:{data[0]?.rating[1]}⭐</p>
      <p>Located in {data[0]?.location}</p>
    </div>

    <div className='image-gallery'>
      <div className='main-images'>
      <img src={data[0]?.images.main} alt='mainImage' />
      </div>
      <div className='side-images'>
        {data[0]?.images.gallery.map((image, index) => (
          <img key={index} src={image} alt={`sideImg-${index}`} />
        ))}
      </div>
    </div>

    <div className='property-info'>
      <h3>Property Type: {data[0]?.property_type}</h3>
      <hr />
      <h3>About:</h3>
      <p>{data[0]?.about}</p>
    </div>

    <div className='amenities'>
      <h3>Amenities:</h3>
      <div>
        {data[0]?.amenities.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
      <div className='booking-card'>
        <label>Check-In</label>
        <input
          type='date'
          className='CheckIn'
          placeholder='Check-In'
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <label>Check-Out</label>
        <input
          type='date'
          className='CheckOut'
          placeholder='Check-Out'
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <input
          type='number'
          placeholder='Number of Guest'
          className='No_of_guest'
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
        <h3>Price:{data[0]?.price}</h3>
        <button onClick={()=>{handleBookButtonClick(Id,checkInDate,checkOutDate,data[0]?.price,numberOfGuests)}}>Book</button>
      </div>
    </div>
  );
}
