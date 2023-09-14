import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { deleteBooking, getUserBooking, getUserDetails } from '../../Api/api-helpers';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log(res);
        setDeleteSuccessMessage('Booking deleted successfully.');
        setOpenModal(true);
        // Mettre à jour la liste des réservations après la suppression du film
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
        setTimeout(() => {
          setDeleteSuccessMessage('');
          setOpenModal(false);
        }, 4000);
      })
      .catch((err) => console.log(err));
  };
  
  

  return (
    <div className='bodyProf'>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              {user && (
                <div className="card user-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          <img
                            src="https://static.thenounproject.com/png/363639-200.png"
                            className="imguser-radius"
                            alt="User-Profile"
                          />
                        </div>
                        <h6 className="f-w-600">Name: {user.name}</h6>
                        <p>Email: {user.email}</p>
                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                      </div>
                    </div>
                    {bookings && (
                      <div className="col-sm-8">
                        <div className="card-block">
                          <h1 className="mybk_profile">My Bookings</h1>
                          <div className="row table-row">
                            <div className="col-sm-4 table-cell">
                              <p className="m-b-10 f-w-600">Movie</p>
                            </div>
                            <div className="col-sm-4 table-cell">
                              <p className="m-b-10 f-w-600">Seat</p>
                            </div>
                            <div className="col-sm-4 table-cell">
                              <p className="m-b-10 f-w-600">Date</p>
                            </div>
                          </div>
                          {bookings.map((booking, index) => (
                            <div className="row table-row booking-row" key={index}>
                              <div className="col-sm-4 table-cell">
                                <h6 className="text-muted f-w-400 movie-title  my-custom-class">
                                  {booking.movie.title}
                                </h6>
                              </div>
                              <div className="col-sm-4 table-cell">
                                <h6 className="text-muted f-w-400 seat-number">
                                  {booking.seatNumber}
                                </h6>
                              </div>
                              <div className="col-sm-3 table-cell">
                                <h6 className="text-muted f-w-400 booking-date">
                                  {new Date(booking.date).toDateString()}
                                </h6>
                              </div>
                              <div className="col-sm-1 table-cell">
                                <IconButton onClick={() => handleDelete(booking._id)} color='error'>
                                  <DeleteForeverIcon />
                                </IconButton>
                              </div>
                              
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
  <DialogTitle>Booking deleted successfully</DialogTitle>
  <DialogContent>
    <p>{deleteSuccessMessage}</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenModal(false)}>Fermer</Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default UserProfile;
