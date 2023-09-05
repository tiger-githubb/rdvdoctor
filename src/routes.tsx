import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/RegisterLogin/SignUpPage";
import SignInPage from "./pages/RegisterLogin/SignInPage";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfessionalsPage from "./pages/Professionals/ProfessionalsPage";
import Footer from "./components/Footer";
import SearchProfessionalsPage from "./pages/SearchProfessionalsPage/SearchProfessionalsPage";
import ProfessionalProfilePage from "./pages/Professionals/ProfessionalProfilePage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/*  open routes  */}
      <Route path="/" element={<Home />} />
      <Route path="/inscription" element={<SignUpPage />} />
      <Route path="/connexion" element={<SignInPage />} />
      <Route path="/proffesionels" element={<ProfessionalsPage />} />
      <Route path="/recherche" element={<SearchProfessionalsPage />} />
      <Route path="/proffesionels/:uid" element={<ProfessionalProfilePage />} />

      {/* closed routes  */}
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />
      }
      />
    </Routes>
  );
};

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Footer />
    </Router>
  );
};

export default MainRouter;
