import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.client.user);
  const location = useLocation();

  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean((user && (user.email || user.name)) || token);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
