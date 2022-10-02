import React from 'react';
import { Navigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

const ProtectedRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  //   if(user?.token)
  //   const {
  //     data: { role },
  //   } = jwt_decode(user?.token);

  if (!user || user?.role !== 'user') {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoutes;
