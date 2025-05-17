// frontend/src/pages/FormularioProveedor.js

import React, { useState, useEffect } from 'react';

function FormularioProveedor() {
  const [empresa, setEmpresa]     = useState('');
  const [ruc, setRuc]             = useState(localStorage.getItem('ruc') || '');
  const [contacto, setContacto]   = useState('');
  const [correo, setCorreo]       = useState('');
  const [dni, setDni]             = useState('');
  const [telefono, setTelefono]   = useState('');
  const [categoria, setCategoria] = useState('');

  // Estados para cada archivo
  const [dniCopy, setDniCopy]             = useState(null);
  const [rucConstancia, setRucConstancia] = useState(null);
  const [antecedentes, setAntecedentes]   = useState(null);
  const [otroDoc, setOtroDoc]             = useState(null);

  const [mensajeError, setMensajeError] = useState('');

  // Al montar, carga borrador si existe
  useEffect(() => {
    const saved = localStorage.getItem('borradorProveedor');
    if (saved) {
      const draft = JSON.parse(saved);
      setEmpresa(draft.empresa || '');
      setRuc(draft.ruc   || localStorage.getItem('ruc') || '');
      setContacto(draft.contacto || '');
      setCorreo(draft.correo     || '');
      setDni(draft.dni           || '');
      setTelefono(draft.telefono || '');
      setCategoria(draft.categoria || '');
    }
  }, []);

  // Guarda en localStorage el borrador
  const handleGuardarBorrador = () => {
    const draft = { empresa, ruc, contacto, correo, dni, telefono, categoria };
    localStorage.setItem('borradorProveedor', JSON.stringify(draft));
    alert('Borrador guardado 📝');
  };

  // Envía al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');

    // Validación básica de campos obligatorios
    if (!empresa || !ruc || !contacto || !correo || !dni || !telefono || !categoria
        || !dniCopy || !rucConstancia || !antecedentes) {
      setMensajeError('❗ Debes llenar todos los campos y subir los documentos requeridos');
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

    // Cada archivo con la misma key 'archivos'
    formData.append('archivos', dniCopy);
    formData.append('archivos', rucConstancia);
    formData.append('archivos', antecedentes);
    if (otroDoc) formData.append('archivos', otroDoc);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/proveedores`,
        { method: 'POST', body: formData }
      );

      if (response.ok) {
        alert('Proveedor registrado y archivos subidos ✅');
        localStorage.removeItem('borradorProveedor');
        // Limpia todo
        setEmpresa(''); 
        setRuc(localStorage.getItem('ruc') || ''); 
        setContacto(''); 
        setCorreo(''); 
        setDni(''); 
        setTelefono(''); 
        setCategoria(''); 
        setDniCopy(null); 
        setRucConstancia(null); 
        setAntecedentes(null); 
        setOtroDoc(null);
      } else {
        alert('Error al subir los archivos ❌');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Formulario de Proveedor</h1>
      {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Empresa:</label><br />
          <input
            type="text"
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>RUC:</label><br />
          <input
            type="text"
            value={ruc}
            onChange={e => setRuc(e.target.value)}
            required
            maxLength="11"
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Contacto:</label><br />
          <input
            type="text"
            value={contacto}
            onChange={e => setContacto(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Correo:</label><br />
          <input
            type="email"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>DNI:</label><br />
          <input
            type="text"
            value={dni}
            onChange={e => setDni(e.target.value)}
            required
            maxLength="8"
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Teléfono:</label><br />
          <input
            type="tel"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Categoría:</label><br />
          <input
            type="text"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '20px' }}
          />
        </div>

        <h3>Archivos PDF (uno por campo)</h3>
        <div>
          <label>Copia de DNI:</label><br />
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setDniCopy(e.target.files[0])}
            required
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Constancia de RUC:</label><br />
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setRucConstancia(e.target.files[0])}
            required
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Certificado de Antecedentes:</label><br />
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setAntecedentes(e.target.files[0])}
            required
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Otro documento:</label><br />
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setOtroDoc(e.target.files[0])}
            style={{ marginBottom: '20px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Subir Datos y Archivos
        </button>
        <button
          type="button"
          onClick={handleGuardarBorrador}
          style={{ marginLeft: '10px', padding: '10px 20px' }}
        >
          Guardar Borrador
        </button>
      </form>
    </div>
  );
}

export default FormularioProveedor;

