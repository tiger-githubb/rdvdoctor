import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Routes, Route } from "react-router-dom";

import { auth } from "../services/firebase";

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const user = auth.currentUser;
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/connexion" />;
  }

  return (
    <Routes>
      <Route element={element} />
    </Routes>
  );
};

export default PrivateRoute;
