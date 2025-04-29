// frontend/src/pages/FormularioProveedor.js

import React, { useState } from 'react';

function FormularioProveedor() {
  const [formData, setFormData] = useState({
    fichaProveedor: null,
    acuerdoComercial: null,
    referenciasComerciales: null,
    facturaBlanco: null,
    estadoCuenta: null,
    fichaRUC: null,
    licenciaFuncionamiento: null,
    constanciaDJ: null,
    declaracionJurada: null
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append('archivos', formData[key]);
      }
    }

    try {
      const response = await fetch('https://registro-proveedores-backend.onrender.com/api/proveedores', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        alert('Documentos enviados correctamente ✅');
        window.location.href = '/login'; // Lo devuelve al login
      } else {
        alert('Error al enviar documentos ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Formulario de Documentos</h1>
      <p>Sube todos los documentos requeridos en formato PDF.</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '10px' }}>
          <label>Ficha de proveedor:</label>
          <input type="file" name="fichaProveedor" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Acuerdo comercial:</label>
          <input type="file" name="acuerdoComercial" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Referencias comerciales:</label>
          <input type="file" name="referenciasComerciales" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Factura en blanco:</label>
          <input type="file" name="facturaBlanco" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Encabezado del estado de cuenta:</label>
          <input type="file" name="estadoCuenta" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Ficha RUC:</label>
          <input type="file" name="fichaRUC" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Licencia de funcionamiento o DJ:</label>
          <input type="file" name="licenciaFuncionamiento" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Constancia DJ anual SUNAT:</label>
          <input type="file" name="constanciaDJ" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Declaración jurada del proveedor:</label>
          <input type="file" name="declaracionJurada" accept="application/pdf" onChange={handleFileChange} required />
        </div>

        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>
          Enviar Documentos
        </button>
      </form>
    </div>
  );
}

export default FormularioProveedor;

