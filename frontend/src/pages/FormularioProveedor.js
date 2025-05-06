// frontend/src/pages/FormularioProveedor.js

import React, { useState } from 'react';

function FormularioProveedor() {
  const [archivos, setArchivos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleFileChange = (e) => {
    setArchivos(e.target.files);
  };

  const handleUpload = async () => {
    if (!archivos.length) {
      setMensaje('Por favor selecciona uno o más archivos PDF.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append('archivos', archivos[i]);
    }

    try {
      const response = await fetch('https://registro-proveedores-backend.onrender.com/api/proveedores/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensaje('Archivos subidos exitosamente ✅');
        setArchivos([]); // Limpia la selección
      } else {
        setMensaje('Error al subir los archivos ❌');
      }
    } catch (error) {
      console.error('Error al subir:', error);
      setMensaje('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Formulario de Documentos</h1>
      <p>Aquí cargarás todos los documentos requeridos como proveedor.</p>

      <div>
        <label>Selecciona tus archivos PDF:</label>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          style={{ display: 'block', margin: '10px 0' }}
        />
      </div>

      {archivos.length > 0 && (
        <ul>
          {Array.from(archivos).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      <button onClick={handleUpload} style={{ padding: '10px 20px' }}>
        Subir Archivos
      </button>

      {mensaje && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{mensaje}</p>}
    </div>
  );
}

export default FormularioProveedor;

