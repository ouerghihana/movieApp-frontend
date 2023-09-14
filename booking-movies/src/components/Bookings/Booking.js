import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../Api/api-helpers';
import { newBooking } from '../../Api/api-helpers';
import Rating from './Rating';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import './Booking.css';

const Booking = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: '', date: '' });
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setMovie(res);
        console.log(res); // Affiche les détails du film
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (movie) {
      newBooking({ ...inputs, movie: movie._id })
        .then((res) => {
          console.log(res);
        setOpenModal(true); // Afficher la fenêtre modale lorsque le film est créé
          setTimeout(() => {
            navigate('/payment'); // Redirect to the payment page
          }, 3000); // Redirect after 3 seconds
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Movie is undefined');
    }
  };

   const handleCloseModal = () => {
    setOpenModal(false); // Fermer la fenêtre modale
  };

  return (
    <div className='body_booking'>
      <h1>Book ticket of movie :</h1>

      {movie && (
        <div className='card_booking'>
          <div className='card_left'>
            <img src={movie.posterUrl} alt='cover' />
          </div>
          <div className='card_right'>
            <h1>{movie.title}</h1>
            <div className='card_right__details'>
              <ul>
                <li> Release Date: {new Date(movie.releaseDate).toDateString()} </li>
              </ul>
            </div>
            <div className='card_right__review'>
              <p>{movie.description}</p>
              <a href='/booking' target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'underline' }}>
                Read more
              </a>
              {movie.actors && <p>ACTORS: {movie.actors.map((actor) => ' ' + actor + ' , ')}</p>}
            </div>
            <div className='card_right__button'>
              <a href={movie.trailer} target='_blank' rel='noopener noreferrer'>
                WATCH TRAILER
              </a>
            </div>
            <div className='card_right__rating'>
              <div className='card_right__rating__stars'>
                <fieldset className='rating'>
                  <Rating />
                </fieldset>
              </div>
            </div>
          </div>
          <form className='All_input' onSubmit={handleSubmit}>
            <div className='input-group'>
              <label className='label_seat'>Number Of Seats</label>
              <input
                autoComplete='off'
                className='input_seat'
                type='number'
                name='seatNumber'
                value={inputs.seatNumber}
                onChange={handleChange}
              />
            </div>

            <div className='input-group'>
              <label className='label_seat'>Date booking</label>
              <input
                autoComplete='off'
                className='input_seat'
                type='date'
                name='date'
                value={inputs.date}
                onChange={handleChange}
              />
            </div>
            <button className='button_bookNow'> BOOK NOW </button>
          </form>
        </div>
      )}


       {/* Fenêtre modale pour afficher le message "Movie created" */}
  <Dialog open={openModal} onClose={handleCloseModal}>
  <DialogTitle>Movie Created</DialogTitle>
  <DialogContent>
    <p>Success booking!</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal}>OK</Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default Booking;