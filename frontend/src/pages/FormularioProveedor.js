// frontend/src/pages/FormularioProveedor.js

import React, { useState } from 'react';

function FormularioProveedor() {
  const [archivos, setArchivos] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleFileChange = (e) => {
    setArchivos(e.target.files);
  };

  const handleUpload = async () => {
    if (!archivos || archivos.length === 0) {
      alert('Por favor, selecciona al menos un archivo.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append('archivos', archivos[i]);
    }

    try {
      const ruc = localStorage.getItem('ruc'); // Asegúrate que esto se haya guardado al hacer login
      const response = await fetch(`https://registro-proveedores-backend.onrender.com/api/proveedores/upload/${ruc}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensaje('Archivos subidos exitosamente ✅');
      } else {
        setMensaje('Error al subir los archivos ❌');
      }
    } catch (error) {
      console.error('Error al subir:', error);
      setMensaje('Error al subir los archivos ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Formulario de Documentos</h1>
      <p>Aquí cargarás todos los documentos requeridos como proveedor.</p>

      <div style={{ marginBottom: '15px' }}>
        <label>Selecciona tus archivos PDF:</label>
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'block', marginTop: '10px' }}
        />
      </div>

      <button onClick={handleUpload} style={{ padding: '10px 20px' }}>
        Subir Archivos
      </button>

      {mensaje && <p style={{ marginTop: '20px', color: mensaje.includes('✅') ? 'green' : 'red' }}>{mensaje}</p>}
    </div>
  );
}

export default FormularioProveedor;

