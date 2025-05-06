// frontend/src/pages/LoginComprador.js

import React, { useState } from 'react';

function LoginComprador() {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === 'comprador@empresa.com' && clave === 'admin123') {
      localStorage.setItem('admin', 'true');
      alert('Login exitoso como comprador ✅');
      window.location.href = '/admin';
    } else {
      alert('Credenciales incorrectas ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login de Comprador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo institucional:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Clave:</label>
          <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Ingresar</button>
      </form>
    </div>
  );
}

export default LoginComprador;
