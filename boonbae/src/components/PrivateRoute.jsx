import React from 'react';
import {Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

const PrivateRoute = ({ component: Component}) => {
  const { user } = useUserStore();
  return(
    user ? Component : <Navigate to='/login'/>
  );
};

export default PrivateRoute;