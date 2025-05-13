import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegistroProveedor      from './pages/RegistroProveedor';
import LoginProveedor         from './pages/LoginProveedor';
import FormularioProveedor    from './pages/FormularioProveedor';
import DashboardProveedor     from './pages/DashboardProveedor';  // <— AÑADE esto
import LoginComprador         from './pages/LoginComprador';
import DashboardComprador     from './pages/DashboardComprador';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                    element={<LoginProveedor />} />
        <Route path="/registro"            element={<RegistroProveedor />} />
        <Route path="/formulario"          element={<FormularioProveedor />} />
        <Route path="/dashboard-proveedor" element={<DashboardProveedor />} />  {/* <— AÑADE */}
        <Route path="/login-comprador"     element={<LoginComprador />} />
        <Route path="/dashboard-comprador" element={<DashboardComprador />} />  {/* o '/admin', según prefieras */}
      </Routes>
    </Router>
  );
}

export default App;

