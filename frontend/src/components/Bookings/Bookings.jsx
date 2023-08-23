import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const guestToken = localStorage.getItem("guestToken");
        const response = await fetch("https://homestead.onrender.com/bookings", {
          headers: {
            Authorization: guestToken,
            
          },
        });
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleEditBooking = (bookingId) => {
    // Handle edit action here
  };

  const handleUpdateBooking = (bookingId, newStartDate, newEndDate, newRoomsBooked) => {
    // Handle update action here
  };

  const handleDeleteBooking = async (bookingId) => {
    // Handle delete action here
  };

  return (
    <div className="bookings-page">
      <h1 className="page-heading">Your Bookings</h1>
      <div className="bookings-list">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <div className="booking-details">
                <h2>Booking ID: {booking.id}</h2>
                <p>Property Name: {booking.property_name}</p>
                <p>Check-in Date: {new Date(booking.start_date).toLocaleDateString()}</p>
                <p>Check-out Date: {new Date(booking.end_date).toLocaleDateString()}</p>
                <p>Number of Rooms Booked: {booking.rooms_booked}</p>
                <p>Total Fare: ₹ {booking.total_fare}</p>
                {booking.coupon_code && (
                  <>
                    <p>Coupon Code: {booking.coupon_code}</p>
                    <p>Discounted Price: ₹ {booking.discounted_price}</p>
                  </>
                )}
              </div>
              <div className="actions">
                <Link to={`/detail/${booking.property_id}`}>
                  <button className="btn btn-blue">View Details</button>
                </Link>
                <div className="btn-group">
                  <button
                    className="btn btn-green"
                    onClick={() => handleEditBooking(booking.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );

};

export default BookingsPage;
