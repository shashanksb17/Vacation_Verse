import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const newStartDateRef = useRef();
  const newEndDateRef = useRef();
  const newRoomsBookedRef = useRef();
  const cancelRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);

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
    setSelectedBookingId(bookingId);
    setEditModalOpen(true);
  };

  const updateBookingDetails = async (
    bookingId,
    newStartDate,
    newEndDate,
    newRoomsBooked
  ) => {
    try {
      const startDate = new Date(newStartDate).toISOString().split("T")[0];
      const endDate = new Date(newEndDate).toISOString().split("T")[0];
      const guestToken = sessionStorage.getItem("guestToken");
      const response = await fetch(
        `https://homestead.onrender.com/bookings/${bookingId}`,
        {
          method: "PUT",
          headers: {
            Authorization: guestToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_date: startDate,
            end_date: endDate,
            rooms_booked: newRoomsBooked,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Booking updated successfully, update the bookings list
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? {
                  ...booking,
                  start_date: newStartDate,
                  end_date: newEndDate,
                  rooms_booked: newRoomsBooked,
                }
              : booking
          )
        );
        alert("Booking Updated Successfully");
      } else {
        console.error("Failed to update booking:", data);
        alert("Failed to update booking. Please try again.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert(
        "An error occurred while updating the booking. Please try again later."
      );
    }
  };

  const handleUpdateBooking = async (
    bookingId,
    newStartDate,
    newEndDate,
    newRoomsBooked
  ) => {
    try {
      const originalBooking = bookings.find((booking) => booking.id === bookingId);
      const originalEndDate = new Date(originalBooking.end_date);
      const selectedEndDate = new Date(newEndDate);
      const originalRoomsBooked = originalBooking.rooms_booked;
      const originalTotalFare = originalBooking.total_fare;

      let extraDays = 0;
      let extraRooms = 0;

      // Calculate the number of extra days if end_date is extended
      if (selectedEndDate > originalEndDate) {
        extraDays = Math.floor((selectedEndDate - originalEndDate) / (1000 * 60 * 60 * 24));
      }

      // Calculate the number of extra rooms if rooms_booked is increased
      if (newRoomsBooked > originalRoomsBooked) {
        extraRooms = newRoomsBooked - originalRoomsBooked;
      }

      // Calculate the extra amount required to pay based on extra days and extra rooms
      const extraDaysAmount = originalBooking.total_fare * extraDays;
      const extraRoomsAmount = originalBooking.total_fare * extraRooms;
      const totalExtraAmount = extraDaysAmount + extraRoomsAmount;

      // Show the payment modal only if there is an extra amount to be paid
      if (totalExtraAmount > 0) {
        setPaymentAmount(totalExtraAmount);
        setSelectedBookingId(bookingId);
        setShowPaymentModal(true);
      } else {
        // If no extra amount, directly update the booking details
        await updateBookingDetails(bookingId, newStartDate, newEndDate, newRoomsBooked);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert(
        "An error occurred while updating the booking. Please try again later."
      );
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      // Payment successful, update the booking details
      const bookingId = selectedBookingId;
      const bookingToUpdate = bookings.find((booking) => booking.id === bookingId);
      const newStartDate = new Date(newStartDateRef.current.value).toISOString();
      const newEndDate = new Date(newEndDateRef.current.value).toISOString();
      const newRoomsBooked = parseInt(newRoomsBookedRef.current.value);
  
      await updateBookingDetails(bookingId, newStartDate, newEndDate, newRoomsBooked);
  
      setShowPaymentModal(false);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert(
        "An error occurred while processing the payment. Please try again."
      );
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBookingId) {
      return; // No booking selected for deletion
    }

    try {
      const guestToken = sessionStorage.getItem("guestToken");
      const response = await fetch(
        `https://homestead.onrender.com/bookings/${selectedBookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: guestToken,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Booking deleted successfully, update the bookings list
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBookingId)
        );
        setSelectedBookingId(null); // Reset selectedBookingId after successful deletion
      } else {
        console.error("Failed to delete booking:", data);
        alert("Failed to delete booking. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(
        "An error occurred while deleting the booking. Please try again later."
      );
    }

    setDeleteModalOpen(false); // Close the delete confirmation modal
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
                    onClick={() => {
                      setSelectedBookingId(booking.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {isDeleteModalOpen && selectedBookingId === booking.id && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>Delete Booking</h2>
                    <p>Are you sure you want to delete this booking?</p>
                    <button onClick={() => setDeleteModalOpen(false)}>No</button>
                    <button onClick={handleDeleteBooking} className="btn-red">
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Credit Card Details</h2>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {/* ... (other payment fields) */}
            <button onClick={handlePaymentSuccess} className="btn-green">
              Pay
            </button>
            <button onClick={() => setShowPaymentModal(false)} className="btn-gray">
              Cancel
            </button>
          </div>
        </div>
      )}
      {selectedBookingId && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Booking</h2>
            <input
              type="date"
              defaultValue={
                bookings.find((booking) => booking.id === selectedBookingId).start_date
              }
              ref={newStartDateRef}
            />
            {/* ... (other edit fields) */}
            <button
              onClick={() =>
                handleUpdateBooking(
                  selectedBookingId,
                  newStartDateRef.current.value,
                  newEndDateRef.current.value,
                  newRoomsBookedRef.current.value
                )
              }
              className="btn-green"
            >
              Update
            </button>
            <button onClick={() => setEditModalOpen(false)} className="btn-gray">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
