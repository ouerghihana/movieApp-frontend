import React from 'react';
import './MovieItem.css';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-card">
      <img className="movie-poster" src={movie.posterUrl} alt={movie.title} />
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
        <span className="movie-date">{new Date(movie.releaseDate).toDateString()}</span>
        <Link to={`/booking/${movie._id}`} className="btn-book">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default MovieItem;
