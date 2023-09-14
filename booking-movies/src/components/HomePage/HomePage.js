import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMovies } from '../../Api/api-helpers';
import { setMovies } from '../../store/MovieSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);

  const [latestMovie, setLatestMovie] = useState();
  const [showAllMovies, setShowAllMovies] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        dispatch(setMovies(data.reverse()));
        if (data.length > 0) {
          setLatestMovie(data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, [dispatch]);

  const displayMovies = showAllMovies ? movies : movies.slice(0, 5);

  return (
    <div className="homepage-content">
      <div className='latest-movie'>
        <h1>Trending today:</h1>

        {latestMovie && (
          <div className='body_latest_movie'>
            <div className="image-area">
              <div className="img-wrapper">
                {/* Lien vers la page de réservation avec l'ID du dernier film */}
                <Link to={`/booking/${latestMovie.id}`}>
                  <img src={latestMovie.posterUrl} alt={latestMovie.title} />
                  <h2>{latestMovie.title}</h2>
                  <ul>
                    <li>
                      <a href={latestMovie.trailer}>
                        <i className="fas fa-play"></i>
                      </a>
                    </li>
                    <li>
                      <i className="fa-solid fa-audio-description"></i>
                    </li>
                  </ul>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="discover_movie">
        <p>Discover the latest movies and book your tickets now.</p>
      </div>

      <div className="movie-list">
        {displayMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {/* Lien vers la page de réservation avec l'ID du film */}
            
            <Link to={`/booking/${movie._id}`}>
              <img src={movie.posterUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
            </Link>
            
          </div>
            
        ))}
        {!showAllMovies && (
          <Link
            to="/movies"
            className="view-all-movies"
            onClick={() => setShowAllMovies(true)}
          >
            View All Movies <span className="arrow"></span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
