import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from './services/firebase';

const PrivateRoute: React.FC<{
  element: React.ReactNode;
}> = ({ element }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  return <Route element={element} />;
};

export default PrivateRoute;
