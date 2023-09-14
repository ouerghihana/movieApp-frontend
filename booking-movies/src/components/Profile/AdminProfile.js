import React, { useEffect, useState } from 'react';
import './AdminProfile.css';
import { getAdminById, deleteMovie } from '../../Api/api-helpers';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const AdminProfile = () => {
    
  const [admin, setAdmin] = useState();
  const [openModal, setOpenModal] = useState(false); // État pour la fenêtre modale

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);
  const handleDeleteMovie = (movieId) => {
    deleteMovie(movieId)
      .then((res) => {
        console.log(res); // Affiche le message "Movie deleted"
        setOpenModal(true); // Affiche la fenêtre modale après la suppression du film

        
        // Mettez à jour l'état des films ajoutés par l'administrateur après la suppression
        setAdmin((prevAdmin) => ({
          ...prevAdmin,
          addedMovies: prevAdmin.addedMovies.filter((movie) => movie._id !== movieId),
        }));
      })
      .catch((err) => console.log(err));
  };
  const handleCloseModal = () => {
    setOpenModal(false); // Ferme la fenêtre modale
  };


  return (
    <div className="body_AdminProfile">
      <div className="page-contentAdmin page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              {admin && (
                <div className="card Admin-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green AdminProfile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          <img
                            src="https://logodix.com/logo/1707088.png"
                            className="imgAdmin-radius"
                            alt="Profile"
                          />
                        </div>
                        <h6 className="f-w-600">Email: {admin.email}</h6>
                        <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                      </div>
                    </div>
                    {admin && admin.addedMovies.length > 0 && (
                      <div className="col-sm-8">
                        <div className="card-block-admin">
                          <h1 className="_profileAd">Added Movies</h1>
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Movie</th>
                                  <th>Date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {admin.addedMovies.map((movie, index) => (
                                  <tr key={index}>
                                    <td>
                                      <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="movie-poster"
                                      />
                                      {movie.title}
                                    </td>
                                    <td>
                                         {new Date(movie.date).toLocaleDateString()}
                                    </td>

                                    <td>
                                      {/* Bouton de suppression */}
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteMovie(movie._id)}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

{/* Fenêtre modale pour afficher le message de succès de suppression */}
         <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Movie Deleted</DialogTitle>
            <DialogContent>
                <p>The movie has been deleted successfully.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>OK</Button>
      </DialogActions>
    </Dialog>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
