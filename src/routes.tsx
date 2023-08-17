import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

const AppRoutes: React.FC = () => { 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

const MainRouter: React.FC = () => { 
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default MainRouter;
