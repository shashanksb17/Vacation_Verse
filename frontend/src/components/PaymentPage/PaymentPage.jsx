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
  

    // Calculate the total price
    const totalPrice = parseFloat(price) * parseInt(guests);
  
    // Function to handle the "Book" button click
    const handleBookClick = () => {
      // For demo purposes, show a booking success message
      const bookingData = {
        check_in: checkIn,
        check_out: checkOut,
        price: price,
        property_id: id,
        guests: guests,
      };
  
      // Send the POST request
      fetch('https://expensive-newt-snaps.cyclic.app/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((response) => {
          // Handle the response if needed
          console.log('Booking successful:', response);
          alert('Booking Successful!');
        })
        .catch((err) => {
          console.error('Error booking:', err);
          // Handle any errors if needed
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
            <button onClick={handleBookClick}>Book</button> {/* Add the "Book" button */}
          </div>
        </div>
        {/* Add your payment processing logic and payment form here */}
      </div>
    );
}
