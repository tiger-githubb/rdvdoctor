// routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
// Importez les autres pages ici

const AppRoutes: React.FC = () => { // Renommez ici
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Ajoutez les routes pour les autres pages ici */}
    </Routes>
  );
};

const MainRouter: React.FC = () => { // Renommez ici
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default MainRouter;
