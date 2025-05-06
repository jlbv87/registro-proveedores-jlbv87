// frontend/src/pages/RegistroProveedor.js

import React, { useState } from 'react';

function RegistroProveedor() {
  const [ruc, setRuc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      setMensaje('Las contraseñas no coinciden ❌');
      return;
    }

    try {
      const response = await fetch('https://registro-proveedores-backend.onrender.com/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruc, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Registro exitoso ✅');
        setRuc('');
        setPassword('');
        setConfirmarPassword('');
      } else {
        setMensaje(data.error || 'Error en el registro ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Registro de Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RUC:</label>
          <input type="text" value={ruc} onChange={(e) => setRuc(e.target.value)} required maxLength="11" />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input type="password" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p style={{ marginTop: '10px' }}>{mensaje}</p>}
    </div>
  );
}

export default RegistroProveedor;
