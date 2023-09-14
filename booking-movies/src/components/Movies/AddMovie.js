import React, { useState } from 'react';
import './AddMovie.css';
import Checkbox from '@mui/material/Checkbox';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { addMovie } from '../../Api/api-helpers';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const navigate = useNavigate(); 

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    posterUrl: '',
    releaseDate: '',
    trailer: '',
    featured: false,
  });

  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => {
        console.log(res);
        setOpenModal(true); // Afficher la fenêtre modale lorsque le film est créé
      })
      .catch((err) => console.log(err));
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Fermer la fenêtre modale
    navigate('/'); // Redirect to the home page

  };

  return (
    <div>
      <section className="get-in-touch">
        <h1 className="title">ADD NEW MOVIE</h1>
        <form className="contact-form row" onSubmit={handleSubmit}>
          <div className="form-field col-lg-6">
            <input
              id="title"
              className="input-text js-input"
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
            />
            <label className="label" htmlFor="title">
              Title
            </label>
          </div>
          <div className="form-field col-lg-6 ">
            <input
              id="description"
              className="input-text js-input"
              type="text"
              name="description"
              value={inputs.description}
              onChange={handleChange}
            />
            <label className="label" htmlFor="email">
              Description
            </label>
          </div>

          <div className="form-field col-lg-6 ">
            <input
              id="poster"
              className="input-text js-input"
              type="text"
              name="posterUrl"
              value={inputs.posterUrl}
              onChange={handleChange}
            />
            <label className="label" htmlFor="date">
              Poster Url
            </label>
          </div>
          <div className="form-field col-lg-6 ">
            <input
              id="video"
              className="input-text js-input"
              type="text"
              name="trailer"
              value={inputs.trailer}
              onChange={handleChange}
            />
            <label className="label" htmlFor="date">
              Trailer
            </label>
          </div>
          <div className="form-field col-lg-6 ">
            <input
              id="date"
              className="input-text js-input"
              type="date"
              name="releaseDate"
              value={inputs.releaseDate}
              onChange={handleChange}
            />
            <label className="label" htmlFor="date">
              Release Date
            </label>
          </div>
          <div className="form-field col-lg-6">
            <label className="label" htmlFor="actors">
              Actors
            </label>
            <div className="actors-input-container">
              <textarea
                id="actors"
                className="input-text js-input"
                value={actor}
                name="actor"
                onChange={(e) => setActor(e.target.value)}
              ></textarea>
              <Button
                className="add-actor-btn"
                onClick={() => {
                  setActors([...actors, actor]);
                  setActor('');
                }}
              >
                ADD
              </Button>
            </div>
          </div>
          <div className="form-field col-lg-6 ">
            <label className="label" htmlFor="feature">
              Featured
            </label>
            <Checkbox
              name="featured"
              id="feature"
              checked={Boolean(inputs.featured)}
              onClick={(e) =>
                setInputs((prevState) => ({
                  ...prevState,
                  featured: e.target.checked,
                }))
              }
              style={{
                color: '#9b6d0b',
                marginLeft: '100px',
              }}
            />
          </div>

          <div className="form-field col-lg-12">
            <button className="submit-btn" type="submit">
              Add New Movie
            </button>
          </div>
        </form>
      </section>
  {/* Fenêtre modale pour afficher le message "Movie created" */}
  <Dialog open={openModal} onClose={handleCloseModal}>
  <DialogTitle>Movie Created</DialogTitle>
  <DialogContent>
    <p>Your movie has been created successfully.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal}>OK</Button>
  </DialogActions>
</Dialog>
</div>
    
  );
};

export default AddMovie;
