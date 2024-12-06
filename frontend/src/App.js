import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import AdminPage from './pages/adminPage';
import ClientePage from './pages/clientesPage';
import RegisterPage from './pages/registerPage';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cliente" element={<ClientePage />} />
      </Routes>
  );
};

export default App;
