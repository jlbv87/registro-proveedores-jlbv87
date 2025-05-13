// frontend/src/pages/FormularioProveedor.js

import React, { useState } from 'react';

function FormularioProveedor() {
  const [empresa, setEmpresa]       = useState('');
  const [ruc, setRuc]               = useState(localStorage.getItem('ruc') || '');
  const [contacto, setContacto]     = useState('');
  const [correo, setCorreo]         = useState('');
  const [dni, setDni]               = useState('');
  const [telefono, setTelefono]     = useState('');
  const [categoria, setCategoria]   = useState('');
  const [archivos, setArchivos]     = useState([]);
  const [mensajeError, setMensajeError] = useState('');

  const handleFileChange = (e) => {
    setArchivos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');

    // Validaciones básicas
    if (!empresa || !ruc || !contacto || !correo || !dni || !telefono || !categoria) {
      setMensajeError('❗ Debes llenar todos los campos');
      return;
    }

    const formData = new FormData();
    formData.append('empresa', empresa);
    formData.append('ruc', ruc);
    formData.append('contacto', contacto);
    formData.append('correo', correo);
    formData.append('dni', dni);
    formData.append('telefono', telefono);
    formData.append('categoria', categoria);
    archivos.forEach((file) => formData.append('archivos', file));

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/proveedores`,
        { method: 'POST', body: formData }
      );

      if (res.ok) {
        alert('Proveedor registrado y archivos subidos ✅');
      } else {
        const body = await res.json().catch(() => ({}));
        setMensajeError(body.message || 'Error al procesar la solicitud ❌');
      }
    } catch (err) {
      console.error(err);
      setMensajeError('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <h1>Formulario de Proveedor</h1>

      {mensajeError && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          {mensajeError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Empresa:</label><br />
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>

        <div>
          <label>RUC:</label><br />
          <input
            type="text"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            required
            maxLength="11"
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>

        <div>
          <label>Contacto:</label><br />
          <input
            type="text"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>

        <div>
          <label>Correo:</label><br />
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>

        <div>
          <label>DNI:</label><br />
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            maxLength="8"
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>

        <div>
          <label>Teléfono:</label><br />
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>

        <div>
          <label>Categoría:</label><br />
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>

        <div>
          <label>Archivos PDF:</label><br />
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ marginBottom: 20 }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Subir Datos y Archivos
        </button>
      </form>
    </div>
  );
}

export default FormularioProveedor;

