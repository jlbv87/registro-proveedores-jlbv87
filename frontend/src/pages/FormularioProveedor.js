// frontend/src/pages/FormularioProveedor.js

import React, { useState, useEffect } from 'react';

function FormularioProveedor() {
  const [ruc, setRuc] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const rucGuardado = localStorage.getItem('ruc');
    if (rucGuardado) {
      setRuc(rucGuardado);
    } else {
      setMensaje('Error: no se encontró RUC. Por favor inicia sesión nuevamente.');
    }
  }, []);

  const handleArchivoChange = (e) => {
    setArchivos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ruc || archivos.length === 0) {
      setMensaje('Por favor completa todos los campos.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append('archivos', archivos[i]);
    }
    formData.append('ruc', ruc);

    try {
      const response = await fetch('https://registro-proveedores-backend.onrender.com/api/proveedores/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensaje('Archivos subidos exitosamente ✅');
        setArchivos([]);
      } else {
        setMensaje('Error al subir los archivos ❌');
      }
    } catch (error) {
      console.error('Error al subir archivos:', error);
      setMensaje('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Formulario de Documentos</h1>
      {mensaje && <p>{mensaje}</p>}
      {ruc && (
        <form onSubmit={handleSubmit}>
          <p><strong>RUC:</strong> {ruc}</p>
          <div>
            <label>Selecciona tus archivos PDF:</label>
            <input type="file" onChange={handleArchivoChange} accept="application/pdf" multiple required />
          </div>
          <br />
          <button type="submit">Subir Archivos</button>
        </form>
      )}
    </div>
  );
}

export default FormularioProveedor;

