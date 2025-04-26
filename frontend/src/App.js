// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistroProveedor from './RegistroProveedor';
import LoginProveedor from './LoginProveedor';
import FormularioProveedor from './FormularioProveedor';
import ProtectedRoute from './ProtectedRoute'; // 👈 Importamos la protección

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegistroProveedor />} />
        <Route path="/login" element={<LoginProveedor />} />
        <Route
          path="/formulario"
          element={
            <ProtectedRoute>
              <FormularioProveedor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
