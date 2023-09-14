import './App.css';
import React from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from './components/header/Header'
import HomePage from './components/HomePage/HomePage';
import Movies from './components/Movies/Movies';
import Admin from './components/Admin/Admin';
import Auth from './components/Auth/Auth'
import Booking from './components/Bookings/Booking';
import { adminLogin } from './store/AdminSlice';
import { userLogin } from './store/UserSlice';
import UserProfile from './components/Profile/UserProfile';
import AddMovie from './components/Movies/AddMovie';
import AdminProfile from './components/Profile/AdminProfile';
import PaymentForm from './components/Payment/PaymentForm';
function App() {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
console.log("isAdminLoggedIn",isAdminLoggedIn)
console.log("isUserLoggedIn",isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(userLogin());
    } else if (localStorage.getItem('adminId')) {
      dispatch(adminLogin());
    }
  }, []);
 
  
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />

          {!isUserLoggedIn && !isAdminLoggedIn && (
            <React.Fragment>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </React.Fragment>
          )}

          {isUserLoggedIn && !isAdminLoggedIn && (
            <React.Fragment>
            <Route path="/payment" element={<PaymentForm />} />

              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </React.Fragment>
          )}

          {isAdminLoggedIn && !isUserLoggedIn && (
            <React.Fragment>
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />
            </React.Fragment>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
