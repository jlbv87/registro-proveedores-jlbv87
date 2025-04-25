import React, { useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('Bienvenido al registro de proveedores');

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{mensaje}</h1>
      <p>La página de carga de proveedores estará disponible pronto.</p>
    </div>
  );
}

export default App;