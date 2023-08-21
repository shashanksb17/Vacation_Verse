import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './Home.css';
import Footer from '../Footer/Footer';

export default function Home() {
  const [data, setData] = useState([]);
  const [nameSearchQuery, setNameSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);

  useEffect(() => {
    fetch(`https://homestead.onrender.com/properties`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggle = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, val: !item.val };
        }
        return item;
      })
    );
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<span key={i} className="star">&#11088;</span>);
    }
    return stars;
  };

  const filteredData = data.filter((ele) =>
    ele.name.toLowerCase().includes(nameSearchQuery.toLowerCase()) &&
    ele.location.toLowerCase().includes(locationSearchQuery.toLowerCase()) &&
    (minPrice === '' || ele.price >= parseFloat(minPrice)) &&
    (maxPrice === '' || ele.price <= parseFloat(maxPrice)) &&
    ele.rating[0] >= minRating &&
    ele.rating[0] <= maxRating
  );

  return (
    <div>
      <div id="features">
        <div id="search">
          <div className="search-container">
            <label id='featuresss' htmlFor="nameSearchQuery">Search by Name:</label>
            <input
            placeholder='Enter Name'
              type="text"
              id="nameSearchQuery"
              value={nameSearchQuery}
              onChange={(e) => setNameSearchQuery(e.target.value)}
            />
          </div>
          <div className="search-container">
            <label id='featuresss' htmlFor="locationSearchQuery">Search by Location:</label>
            <input
            placeholder='Enter Location'
              type="text"
              id="locationSearchQuery"
              value={locationSearchQuery}
              onChange={(e) => setLocationSearchQuery(e.target.value)}
            />
          </div>
          <div id='sildermax'>
            <div id="minmax">
            <label id='featuresss'>Filter by Price Range</label>
            <div className="search-container">
              <input
                placeholder="Min Price"
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="search-container">
              <input
                placeholder="Max Price"
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="search-container">
            <label id='featuresss'>Filter by Rating Range</label>
            <div className="slider-container">
              
              <span>{maxRating}</span>
              <input
              class="slider"
                type="range"
                min={0}
                max={5}
                step={1}
                value={maxRating}
                onChange={(e) => setMaxRating(parseFloat(e.target.value))}
              />
            </div>
          </div>
          </div>
          
        </div>
      </div>

      <div className="container">
        {filteredData.map((ele) => (
          <div className="card" key={ele.id}>
            <div>
              <img src={ele.images.main} alt="photo" />
            </div>
            <div>
              <div>
                <h3>{ele.name}</h3>
                <p className="golden">
                  {renderStars(ele.rating[0])}
                  {ele.rating[0]}
                </p>
              </div>
              <p>{ele.location}</p>
              <h4>
                &#x20B9; {ele.price} <span className="night">per night</span>
              </h4>
            </div>
            <Link to={`/detail/${ele.id}`}>
              <button className="Seemore">See more</button>
            </Link>
            <button id="like" onClick={() => handleToggle(ele.id)}>
              {ele.val ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
