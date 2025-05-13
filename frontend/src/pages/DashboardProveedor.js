// frontend/src/pages/DashboardProveedor.js

import React, { useState } from 'react';

function DashboardProveedor() {
  const [archivos, setArchivos] = useState([]);

  const handleFileChange = (e) => {
    setArchivos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ruc = localStorage.getItem('ruc');
    if (!ruc) {
      alert('RUC no encontrado. Inicia sesión nuevamente.');
      return;
    }

    const formData = new FormData();
    formData.append('ruc', ruc);
    formData.append('empresa', e.target.empresa.value);
    formData.append('contacto', e.target.contacto.value);
    formData.append('correo', e.target.correo.value);
    formData.append('dni', e.target.dni.value);
    formData.append('telefono', e.target.telefono.value);
    formData.append('categoria', e.target.categoria.value);
    archivos.forEach((archivo) => {
      formData.append('archivos', archivo);
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/proveedores`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        alert('Archivos subidos exitosamente ✅');
        setArchivos([]);
      } else {
        alert('Error al subir los archivos ❌');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Formulario de Documentos</h2>
      <p><strong>RUC:</strong> {localStorage.getItem('ruc')}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Empresa:</label>
          <input name="empresa" type="text" required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Contacto:</label>
          <input name="contacto" type="text" required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input name="correo" type="email" required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>DNI:</label>
          <input name="dni" type="text" required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Teléfono:</label>
          <input name="telefono" type="tel" required style={{ width: '100%', marginBottom: '10px' }} />
        </div>
        <div>
          <label>Categoría:</label>
          <select name="categoria" required style={{ width: '100%', marginBottom: '10px' }}>
            <option value="">Selecciona...</option>
            <option value="categoria1">Categoría 1</option>
            <option value="categoria2">Categoría 2</option>
          </select>
        </div>
        <div>
          <label>Selecciona tus archivos PDF:</label><br />
          <input name="archivos" type="file" multiple accept="application/pdf" onChange={handleFileChange} />
        </div>
        <br />
        <button type="submit">Subir Archivos</button>
      </form>
    </div>
  );
}

export default DashboardProveedor;

