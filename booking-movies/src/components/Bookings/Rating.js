import React, { useState } from 'react';
import './Rating.css'
const Rating = () => {
    const [rating, setRating] = useState(0);
  
    const handleRatingChange = (event) => {
      setRating(parseInt(event.target.value));
    };
  
    return (
      <div  className="rating-container">
        <h2>Rate this movie:</h2>
        <fieldset className="rating">
          {/* Render the rating stars */}
          <input
            type="radio"
            id="star5"
            name="rating"
            value="5"
            onChange={handleRatingChange}
            checked={rating === 5}
          />
          <label htmlFor="star5" title="5 stars"></label>
  
          {/* Add the rest of the stars */}
          <input
            type="radio"
            id="star4"
            name="rating"
            value="4"
            onChange={handleRatingChange}
            checked={rating === 4}
          />
          <label htmlFor="star4" title="4 stars"></label>
  
          <input
            type="radio"
            id="star3"
            name="rating"
            value="3"
            onChange={handleRatingChange}
            checked={rating === 3}
          />
          <label htmlFor="star3" title="3 stars"></label>
  
          <input
            type="radio"
            id="star2"
            name="rating"
            value="2"
            onChange={handleRatingChange}
            checked={rating === 2}
          />
          <label htmlFor="star2" title="2 stars"></label>
  
          <input
            type="radio"
            id="star1"
            name="rating"
            value="1"
            onChange={handleRatingChange}
            checked={rating === 1}
          />
          <label htmlFor="star1" title="1 star"></label>
        </fieldset>
        <p>Your rating: {rating}</p>
      </div>
    );
  };

  export default Rating;