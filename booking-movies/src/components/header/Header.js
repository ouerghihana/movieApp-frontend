import React, { useEffect } from 'react';
import './Header.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMovies } from '../../Api/api-helpers';
import { adminLogout } from '../../store/AdminSlice';
import { userLogout } from '../../store/UserSlice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const movies = useSelector((state) => state.movie.movies);
  
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminLogout() : userLogout());
  };
  
  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo_img_cinema">
          <Link to="/" className="navbar-link">
            <img
              className="img_cinema"
              src="https://logodix.com/logo/67439.png"
              alt="Logo"
            />
          </Link>
        </div>
        <ul className="navbar-links">

        <li className="navbar-link">
            <Link to="/" className="navbar-link">
            <i class="fa-solid fa-house"></i> {" "}
              Home
            </Link>
          </li>
          <li className="navbar-link">
            <Link to="/movies" className="navbar-link">
              Movies
            </Link>
          </li>
          
          
        </ul>
        <div className="form_search">
          <Autocomplete
            onChange={handleChange}
            className="navbar-search"
            freeSolo
            options={movies.map((movie) => movie.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                className="input_search"
                placeholder="Search movies..."
              />
            )}
          />
          <span className="input-border" />
        </div>

        {!isAdminLoggedIn && !isUserLoggedIn && (
          <div className='navbar-login-wrapper'>
            <div className="navbar-login">
              <Link to="/admin" className="navbar-login">
                Admin
              </Link>
            </div>
            <div className="navbar-login">
              <Link to="/auth" className="navbar-login">
                Auth
              </Link>
            </div>
          </div>
        )}

        {isUserLoggedIn && (
          <div className='user_logout-wrapper'>
            <div className="navbar-logout">
              <Link to="/user" className="navbar-logout">
                Profile
              </Link>
            </div>
            <div className="navbar-logout">
              <Link
                to="/"
                className="navbar-logout"
                onClick={()=> logout(false)}
              >
                Logout
              </Link>
            </div>
          </div>
        )}

        {isAdminLoggedIn && (
          <div className='navbar-admin-wrapper'  >
            <div className="navbar-admin">
              <Link to="/add"  className="navbar-admin" >
                Add movie
              </Link>
            </div>
            <div >
              <Link to="/user-admin" className="navbar-admin" >
                Profile
              </Link>
            </div>
            <div >
              <Link
                to="/"
                className="navbar-admin"
                onClick={()=> logout(true)}
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
