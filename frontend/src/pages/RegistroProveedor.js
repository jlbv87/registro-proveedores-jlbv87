import React, { useState } from 'react';

function RegistroProveedor() {
  const [ruc, setRuc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden ❌');
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

      if (response.ok) {
        alert('Registro exitoso ✅');
        window.location.href = '/';
      } else if (response.status === 409) {
        alert('Este RUC ya está registrado ❗');
      } else {
        alert('Error al registrar ❌');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Registro de Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>RUC:</label>
          <input
            type="text"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            required
            maxLength="11"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistroProveedor;

