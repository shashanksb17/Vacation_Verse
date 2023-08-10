import React from 'react';
import { useParams } from 'react-router-dom';


export default function PaymentPage() {
    console.log(window.location)
    const searchParams = new URLSearchParams(window.location.search);
    const {id}=useParams()
    // const id = searchParams.get('id');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const price = searchParams.get('price');
    const guests = searchParams.get('guests');
  
    const totalPrice = parseFloat(price) * parseInt(guests);

    let token=localStorage.getItem("guestToken")
  
    const handleBookClick = () => {
    
      const bookingData = {
        start_date: checkIn,
        end_date: checkOut,
        property_id: id,
        no_of_people: guests,
      };
  
      fetch('https://puzzled-cow-coveralls.cyclic.app/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response.message)
          if(response.error){
            alert(response.error)
          }else if(response.message=="Invalid token."){
            alert("Login First")
          }
          else{
           console.log('Booking successful:', response);
            alert(response.message);
          }

        })
        .catch((err) => {
          console.error('Error booking:', err);
   
        });
   
    };
  
    return (
      <div>
        <h1>Payment Page</h1>
        <div className="booking-details">
          <h2>Booking Details</h2>
          <div className="booking-card">
            <p>Property ID: {id}</p>
            <p>Check-in: {checkIn}</p>
            <p>Check-out: {checkOut}</p>
            <p>Price: ${price} per night</p>
            <p>Number of Guests: {guests}</p>
            <p>Total Price: ${totalPrice}</p>
            <button onClick={handleBookClick}>Book</button> 
          </div>
        </div>
      
      </div>
    );
}
