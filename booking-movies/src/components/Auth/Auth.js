import React, { useEffect } from 'react';
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../Api/api-helpers';
import { useDispatch, useSelector } from 'react-redux';
import {  userLogin } from '../../store/UserSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);

  const onResReceived = (data) => {
    console.log(data);
    dispatch(userLogin());
    localStorage.setItem('userId', data.id);
  };

  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('isUserLoggedIn:', isUserLoggedIn);
  }, [isUserLoggedIn]);

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
