import React, { useState } from 'react';

function LoginComprador() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && password === '123456') {
      localStorage.setItem('comprador_autenticado', 'true');
      window.location.href = '/comprador/dashboard';
    } else {
      alert('Credenciales incorrectas ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login de Comprador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default LoginComprador;
