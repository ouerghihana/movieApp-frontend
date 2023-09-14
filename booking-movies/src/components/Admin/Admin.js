import React, { useEffect } from 'react';
import './Admin.css';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../Auth/AuthForm';
import { sendAdminAuthRequest } from '../../Api/api-helpers';
import {adminLogin } from '../../store/AdminSlice';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminLogin());
    localStorage.setItem('adminId', data.id);
    localStorage.setItem('token', data.token);
    navigate('/')

  };

  const getData = (data) => {
    console.log('Admin', data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('isAdminLoggedIn:', isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
