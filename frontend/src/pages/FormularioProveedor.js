// frontend/src/pages/FormularioProveedor.js

import React, { useState, useEffect } from 'react';

function FormularioProveedor() {
  // Datos de texto
  const [empresa, setEmpresa]   = useState('');
  const [ruc]                  = useState(localStorage.getItem('ruc') || '');
  const [contacto, setContacto] = useState('');
  const [correo, setCorreo]     = useState('');
  const [dni, setDni]           = useState('');
  const [telefono, setTelefono] = useState('');
  const [categoria, setCategoria] = useState('');

  // Archivos PDF individuales
  const [fichaProveedor, setFichaProveedor]               = useState(null);
  const [acuerdoComercial, setAcuerdoComercial]           = useState(null);
  const [referenciasComerciales, setReferenciasComerciales] = useState(null);
  const [facturaEnBlanco, setFacturaEnBlanco]             = useState(null);
  const [estadoCuenta, setEstadoCuenta]                   = useState(null);
  const [fichaRucDoc, setFichaRucDoc]                     = useState(null);
  const [licenciaFuncionamiento, setLicenciaFuncionamiento] = useState(null);
  const [constanciaAnual, setConstanciaAnual]             = useState(null);
  const [declJurProveedor, setDeclJurProveedor]           = useState(null);

  // Para mensajes de validación
  const [mensajeError, setMensajeError] = useState('');

  // Al montar, carga borrador si existe
  useEffect(() => {
    const saved = localStorage.getItem('draftProveedor');
    if (saved) {
      const d = JSON.parse(saved);
      setEmpresa(d.empresa || '');
      setContacto(d.contacto || '');
      setCorreo(d.correo || '');
      setDni(d.dni || '');
      setTelefono(d.telefono || '');
      setCategoria(d.categoria || '');
    }
  }, []);

  // Guarda en localStorage (sólo campos de texto, no archivos)
  const handleSaveDraft = () => {
    const draft = { empresa, contacto, correo, dni, telefono, categoria };
    localStorage.setItem('draftProveedor', JSON.stringify(draft));
    alert('Borrador guardado ✅');
  };

  // Envío final al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');
    // Validar campos
    if (!empresa || !contacto || !correo || !dni || !telefono || !categoria) {
      setMensajeError('❗ Debes llenar todos los campos');
      return;
    }
    // Construir FormData
    const formData = new FormData();
    formData.append('empresa', empresa);
    formData.append('ruc', ruc);
    formData.append('contacto', contacto);
    formData.append('correo', correo);
    formData.append('dni', dni);
    formData.append('telefono', telefono);
    formData.append('categoria', categoria);

    // Añadir cada PDF (key: 'archivos')
    if (fichaProveedor)       formData.append('archivos', fichaProveedor);
    if (acuerdoComercial)     formData.append('archivos', acuerdoComercial);
    if (referenciasComerciales) formData.append('archivos', referenciasComerciales);
    if (facturaEnBlanco)      formData.append('archivos', facturaEnBlanco);
    if (estadoCuenta)         formData.append('archivos', estadoCuenta);
    if (fichaRucDoc)          formData.append('archivos', fichaRucDoc);
    if (licenciaFuncionamiento) formData.append('archivos', licenciaFuncionamiento);
    if (constanciaAnual)      formData.append('archivos', constanciaAnual);
    if (declJurProveedor)     formData.append('archivos', declJurProveedor);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/proveedores`,
        { method: 'POST', body: formData }
      );
      if (response.ok) {
        alert('Proveedor registrado y archivos subidos ✅');
        localStorage.removeItem('draftProveedor');
      } else {
        alert('Error al subir los archivos ❌');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Formulario de Proveedor</h1>

      {/* Sección de plantillas descargables */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Plantillas descargables (Excel)</h3>
        <ul>
          <li><a href="/templates/FichaProveedor.xlsx" download>📥 Ficha de Proveedor</a></li>
          <li><a href="/templates/AcuerdoComercial.xlsx" download>📥 Acuerdo Comercial</a></li>
          <li><a href="/templates/ReferenciasComerciales.xlsx" download>📥 Referencias Comerciales</a></li>
          <li><a href="/templates/DeclaraProveedor.xlsx" download>📥 Declaración Jurada del Proveedor</a></li>
        </ul>
      </div>

      {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}

      <form onSubmit={handleSubmit}>
        {/* Campos de texto */}
        <div><label>Empresa:</label><br/>
          <input type="text" value={empresa} onChange={e=>setEmpresa(e.target.value)} style={{ width:'100%', marginBottom:'10px' }} required/>
        </div>
        <div><label>RUC:</label><br/>
          <input type="text" value={ruc} readOnly style={{ width:'100%', marginBottom:'10px' }} />
        </div>
        <div><label>Contacto:</label><br/>
          <input type="text" value={contacto} onChange={e=>setContacto(e.target.value)} style={{ width:'100%', marginBottom:'10px' }} required/>
        </div>
        <div><label>Correo:</label><br/>
          <input type="email" value={correo} onChange={e=>setCorreo(e.target.value)} style={{ width:'100%', marginBottom:'10px' }} required/>
        </div>
        <div><label>DNI:</label><br/>
          <input type="text" value={dni} onChange={e=>setDni(e.target.value)} maxLength="8" style={{ width:'100%', marginBottom:'10px' }} required/>
        </div>
        <div><label>Teléfono:</label><br/>
          <input type="tel" value={telefono} onChange={e=>setTelefono(e.target.value)} style={{ width:'100%', marginBottom:'10px' }} required/>
        </div>
        <div><label>Categoría:</label><br/>
          <select value={categoria} onChange={e=>setCategoria(e.target.value)} style={{ width:'100%', marginBottom:'20px' }} required>
            <option value="">--Selecciona categoría--</option>
            <option>Construcción</option>
            <option>Servicios TI</option>
            <option>Transporte</option>
            <option>Otro</option>
          </select>
        </div>

        <h3>Archivos PDF (uno por campo)</h3>

        <div><label>Ficha de Proveedor (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setFichaProveedor(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Acuerdo Comercial (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setAcuerdoComercial(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Referencias Comerciales (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setReferenciasComerciales(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Factura en Blanco (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setFacturaEnBlanco(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Encabezado Estado de Cuenta (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setEstadoCuenta(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Ficha RUC (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setFichaRucDoc(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Licencia / Decl. Jurada (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setLicenciaFuncionamiento(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Constancia Jurada Anual SUNAT (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setConstanciaAnual(e.target.files[0])} required style={{ marginBottom:'10px' }}/>
        </div>
        <div><label>Declaración Jurada del Proveedor (PDF):</label><br/>
          <input type="file" accept="application/pdf" onChange={e=>setDeclJurProveedor(e.target.files[0])} required style={{ marginBottom:'20px' }}/>
        </div>

        {/* Botones */}
        <button type="button" onClick={handleSaveDraft} style={{ marginRight:'10px', padding:'8px 16px' }}>
          💾 Guardar Borrador
        </button>
        <button type="submit" style={{ padding:'8px 16px' }}>
          🚀 Enviar Datos y Archivos
        </button>
      </form>
    </div>
  );
}

export default FormularioProveedor;

