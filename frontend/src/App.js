// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistroProveedor from './pages/RegistroProveedor';
import LoginProveedor from './pages/LoginProveedor';
import FormularioProveedor from './pages/FormularioProveedor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegistroProveedor />} />
        <Route path="/login" element={<LoginProveedor />} />
        <Route path="/formulario" element={<FormularioProveedor />} />
      </Routes>
    </Router>
  );
}

export default App;

