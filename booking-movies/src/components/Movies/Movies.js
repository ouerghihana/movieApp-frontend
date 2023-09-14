import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../../Api/api-helpers';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  const addMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
  };

  return (
    <div className='Movie_container'>
      <div className='All_Movie_style'>
        <h2>All Movies</h2>
      </div>
      <div className="movie-list">
        {movies &&
          movies.map((movie) => (
            <MovieItem key={movie._id} movie={{ ...movie, id: movie._id }} />
          ))}
      </div>
    </div>
  );
};

export default Movies;
