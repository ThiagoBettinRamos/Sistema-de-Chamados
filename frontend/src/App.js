import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import AdminPage from './pages/adminPage';
import ClientePage from './pages/clientesPage';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cliente" element={<ClientePage />} />
      </Routes>
  );
};

export default App;
