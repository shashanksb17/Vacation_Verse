import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function ProductDetail() {
  const { Id } = useParams();
  const [data, setData] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCVV] = useState('');


  const handlePayButtonClick = async() => {
    if (
      cardNumber.length !== 16 ||
      expiryMonth.length !== 2 ||
      expiryYear.length !== 2 ||
      cvv.length !== 3
    ) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in valid card details.',
      });
      return;
    }
    try {
      const response = await fetch('https://homestead.onrender.com/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem("guestToken")}`
        },
        body: JSON.stringify({
          start_date: checkInDate,
          end_date: checkOutDate,
          property_id: Id,
          rooms_booked: numberOfGuests,
          couponCode: couponCode,
          discountedPrice: totalPrice,
          
        }),
      });
      console.log(response)

      if (response.ok) {
        MySwal.fire({
          icon: 'success',
          title: 'Good job!',
          text: 'Payment successful and booking created!',
        });
        // Optionally, you can perform any actions after successful booking creation
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to create booking. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again later.',
      });
    }


  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'vaction10') {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0); // No discount
    }
  };

  const totalPrice = data[0]?.price * (1 - discount);

  useEffect(() => {
    fetch(`https://homestead.onrender.com/properties/${Id}`)
      .then((res) => res.json())
      .then((data) => setData(data.properties))
      .catch((err) => console.log(err));
  }, [Id]);

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<span key={i} className="star">&#11088;</span>);
    }
    return stars;
  };
  



  return (
    <div className='main'>
      <div id='flex-container'>
      <div className='product-details'>
        <div className='product-info'>
          <h3>{data[0]?.name}</h3>
          <p>
            Rating: {renderStars(data[0]?.rating[1])}
          </p>
          <p>Located in {data[0]?.location}</p>
        </div>

        <div className='product-images'>
            <div className='main-image'>
              <img src={data[0]?.images.main} alt='mainImage' />
            </div>
            <div className='image-gallery'>
              {data[0]?.images.gallery.map((image, index) => (
                <img key={index} src={image} alt={`sideImg-${index}`} />
              ))}
            </div>
          </div>

        

          <div className='property-info'>
            <div className='property-type'>
              <h3>Property Type: <span id='gg'> {data[0]?.property_type}</span> </h3>
            </div>
            <div className='about'>
              <h3>About:</h3>
              <p>{data[0]?.about}</p>
            </div>
          </div>

          <div className='amenities'>
            <h3>Amenities:</h3>
            <div className='amenities-list'>
              {data[0]?.amenities.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
      </div>

      <div className='booking-form'>
        <div className='booking-card'>
          <h3 >Book Property</h3>
          <label id='cc'>Name</label>
          <input id='bb' type='text' placeholder='Name' />
          <label id='cc'>Mobile Number</label>
          <input id='bb' type='tel' placeholder='Mobile Number' />
          <label id='cc'>Check-In Date</label>
          <input id='bb'
            type='date'
            placeholder='Check-In'
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <label id='cc'>Check-Out Date</label>
          <input id='bb'
            type='date'
            placeholder='Check-Out'
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
          <label id='cc'>Number of Rooms</label>
          <input id='bb'
            type='number'
            placeholder='Number of Rooms'
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
            <label id='cc'>Coupon Code</label>
          <div id='coupon'>
            <input
              id='bb'
              type='text'
              placeholder='Coupon Code'
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>
          <h3 id='total'>Total Price: {totalPrice.toFixed(2)}</h3>
          <button onClick={() => setIsPopupVisible(true)}>Book</button>


          {isPopupVisible && (
             <div className="popup-overlay">
          <div className="popup">
            <h3>Add Card Details</h3>
            <div className="card-details">
              <input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="expiry">
                <div>
                  <label>Expiry Month</label>
                  <input
                    type="text"
                    placeholder="MM"
                    maxLength="2"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                  />
                </div>
                <div>
                  <label>Expiry Year</label>
                  <input
                    type="text"
                    placeholder="YY"
                    maxLength="2"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                  />
                </div>
              </div>
              <div className="buttons">
                <button className="pay-button" onClick={handlePayButtonClick}>
                  Pay
                </button>
                <button
                  className="cancel-button"
                  id='cancel-button'
                  onClick={() => setIsPopupVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
          )}



        </div>
      </div>
      </div>
    </div>
  );
}
