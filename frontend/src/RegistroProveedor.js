import React, { useState } from 'react';

function RegistroProveedor() {
  const [ruc, setRuc] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://registro-proveedores-backend.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruc, password }),
      });

      if (response.ok) {
        alert('Proveedor registrado exitosamente ✅');
        window.location.href = '/login';
      } else {
        alert('Hubo un error al registrar ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Registro de Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RUC:</label>
          <input type="text" value={ruc} onChange={(e) => setRuc(e.target.value)} required maxLength="11" style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Registrarme</button>
      </form>
    </div>
  );
}

export default RegistroProveedor;
