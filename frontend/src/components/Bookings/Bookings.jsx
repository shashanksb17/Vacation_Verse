import React, { useEffect, useState } from 'react'
import './Bookings.css';
export default function Bookings() {
    
    let token=localStorage.getItem("guestToken")||null;

    const [bookings,setBookings]=useState([])

    useEffect(()=>{
        fetch('https://puzzled-cow-coveralls.cyclic.app/bookings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }

      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setBookings(data.bookings)

        })
        .catch((err) => {
          console.error('Error booking:', err);
   
        });

    },[])
    if(token==null){
        return (
            <h2 className='bookings'>
                No Booking Available: Login to Check Your Bookings
                </h2>
        )
    }

  return (
    <div className='bookings'>
       
        {bookings.map((ele)=>{
          return (
        
            <div className='Booking-card'>
            
                <p>Your Id:{ele.guest_id}</p>
                <p>Property-Booked:{ele.property_id}</p>
                <p>Check-In-Date:{ele.start_date}</p>
                <p>Check-Out-Date:{ele.end_date}</p>
                <p>Number-of-Guest:{ele.no_of_people}</p>
                <p>total_fare:{ele.total_fare}</p>
         
            </div>
           
          )
        })}
       </div>
  )
}
