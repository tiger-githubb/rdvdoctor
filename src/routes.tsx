import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUpPage from './pages/RegisterLogin/SignUpPage';
import SignInPage from './pages/RegisterLogin/SignInPage';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inscription" element={<SignUpPage />} />
      <Route path="/connexion" element={<SignInPage />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
};

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
};

export default MainRouter;
