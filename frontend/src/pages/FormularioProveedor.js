import React, { useState } from 'react';

function FormularioProveedor() {
  const [archivos, setArchivos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleFileChange = (e) => {
    setArchivos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ruc = localStorage.getItem('ruc');
    if (!ruc) {
      alert('Sesión no válida. Por favor vuelve a iniciar sesión.');
      window.location.href = '/login';
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append('archivos', archivos[i]);
    }

    formData.append('ruc', ruc);
    formData.append('empresa', 'Proveedor S.A.C.'); // puedes capturar esto en otro paso si deseas
    formData.append('contacto', 'Nombre Contacto'); // idem
    formData.append('correo', 'contacto@email.com');
    formData.append('dni', '12345678');
    formData.append('telefono', '999999999');
    formData.append('categoria', 'general');

    try {
      const response = await fetch('https://registro-proveedores-backend.onrender.com/api/proveedores', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje('✅ Archivos subidos correctamente');
      } else {
        setMensaje(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al subir:', error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Formulario de Documentos</h1>
      <p>Aquí cargarás todos los documentos requeridos como proveedor.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Selecciona tus archivos PDF:</label><br />
          <input type="file" multiple accept=".pdf" onChange={handleFileChange} />
        </div>
        <button type="submit" style={{ marginTop: '15px', padding: '10px 20px' }}>Subir Archivos</button>
      </form>

      {mensaje && <p style={{ marginTop: '20px' }}>{mensaje}</p>}
    </div>
  );
}

export default FormularioProveedor;

