import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import "./Home.css";
import Footer from '../Footer/Footer';

export default function Home() {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <div className='container'>
        {data.map((ele) => (
          <div className='card' key={ele.id}>
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
            <button id='like'  onClick={() => handleToggle(ele.id)}>
              {ele.val ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
