import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUpPage from './pages/RegisterLogin/SignUpPage';
import SignInPage from './pages/RegisterLogin/SignInPage';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import ProfessionalsPage from './pages/Professionals/ProfessionalsPage';
import Footer from './components/Footer';
import SearchProfessionalsPage from './pages/SearchProfessionalsPage/SearchProfessionalsPage';
import ProfessionalProfilePage from './pages/Professionals/ProfessionalProfilePage';
import Registration from './pages/Registration';

const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/inscription" element={<SignUpPage />} />
      <Route path="/test" element={<Registration/>} />
      <Route path="/connexion" element={<SignInPage />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/proffesionels" element={<ProfessionalsPage/>} />
      <Route path="/recherche" element={<SearchProfessionalsPage/>} />
      <Route path="/proffesionels/:id" element={<ProfessionalProfilePage/>} />

    </Routes>
  );
};

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Footer/>
    </Router>
  );
};

export default MainRouter;
