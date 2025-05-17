// frontend/src/pages/FormularioProveedor.js

import React, { useState } from 'react';

function FormularioProveedor() {
  // Datos básicos
  const [empresa, setEmpresa]       = useState('');
  const [ruc, setRuc]               = useState(localStorage.getItem('ruc') || '');
  const [contacto, setContacto]     = useState('');
  const [correo, setCorreo]         = useState('');
  const [dni, setDni]               = useState('');
  const [telefono, setTelefono]     = useState('');
  const [categoria, setCategoria]   = useState('');

  // Archivos individuales
  const [fichaProveedor, setFichaProveedor]                 = useState(null);
  const [acuerdoComercial, setAcuerdoComercial]             = useState(null);
  const [referenciasComerciales, setReferenciasComerciales] = useState(null);
  const [facturaEnBlanco, setFacturaEnBlanco]               = useState(null);
  const [estadoCuenta, setEstadoCuenta]                     = useState(null);
  const [fichaRucPdf, setFichaRucPdf]                       = useState(null);
  const [licenciaFuncionamiento, setLicenciaFuncionamiento] = useState(null);
  const [constanciaSunat, setConstanciaSunat]               = useState(null);
  const [declaracionProveedor, setDeclaracionProveedor]     = useState(null);

  // Para mostrar errores
  const [mensajeError, setMensajeError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');

    // Validación básica
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

    // Archivos
    fichaProveedor        && formData.append('archivos', fichaProveedor);
    acuerdoComercial      && formData.append('archivos', acuerdoComercial);
    referenciasComerciales&& formData.append('archivos', referenciasComerciales);
    facturaEnBlanco       && formData.append('archivos', facturaEnBlanco);
    estadoCuenta          && formData.append('archivos', estadoCuenta);
    fichaRucPdf           && formData.append('archivos', fichaRucPdf);
    licenciaFuncionamiento&& formData.append('archivos', licenciaFuncionamiento);
    constanciaSunat       && formData.append('archivos', constanciaSunat);
    declaracionProveedor  && formData.append('archivos', declaracionProveedor);

    try {
      const resp = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/proveedores`,
        { method: 'POST', body: formData }
      );
      if (resp.ok) {
        alert('Proveedor registrado y archivos subidos ✅');
      } else {
        alert('Error al subir los archivos ❌');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión ❌');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Formulario de Proveedor</h1>
      {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
      <form onSubmit={handleSubmit}>
        {/* Campos de texto */}
        {[
          ['Empresa', empresa, setEmpresa],
          ['RUC', ruc, setRuc],
          ['Contacto', contacto, setContacto],
          ['Correo', correo, setCorreo],
          ['DNI', dni, setDni],
          ['Teléfono', telefono, setTelefono],
          ['Categoría', categoria, setCategoria],
        ].map(([label, value, setter]) => (
          <div key={label} style={{ marginBottom: 10 }}>
            <label>{label}:</label><br/>
            <input
              type={label === 'Correo' ? 'email' : 'text'}
              value={value}
              onChange={e => setter(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
        ))}

        <h3>Archivos PDF (uno por documento)</h3>

        {[
          ['Ficha de Proveedor',     fichaProveedor,         setFichaProveedor,        'FichaProveedor.xlsx'],
          ['Acuerdo Comercial',      acuerdoComercial,       setAcuerdoComercial,      'AcuerdoComercial.xlsx'],
          ['Referencias Comerciales',referenciasComerciales, setReferenciasComerciales,'ReferenciasComerciales.xlsx'],
          ['Factura en Blanco',      facturaEnBlanco,        setFacturaEnBlanco,       null                  ],
          ['Encabezado Estado de Cuenta', estadoCuenta,      setEstadoCuenta,          null                  ],
          ['Ficha RUC (pdf)',        fichaRucPdf,            setFichaRucPdf,           null                  ],
          ['Licencia Funcionamiento / Decl. Jurada', licenciaFuncionamiento, setLicenciaFuncionamiento, null],
          ['Constancia DJ Anual SUNAT', constanciaSunat,     setConstanciaSunat,       null                  ],
          ['Declaración Jurada del Proveedor', declaracionProveedor, setDeclaracionProveedor, 'DeclaraProveedor.xlsx'],
        ].map(([label, stateVar, setter, plantilla]) => (
          <div key={label} style={{ marginBottom: 15 }}>
            <label>{label}:</label><br/>
            {plantilla &&
              <a
                href={`/templates/${plantilla}`}
                download
                style={{ display: 'inline-block', marginBottom: 4 }}
              >
                Descargar plantilla
              </a>
            }<br/>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => setter(e.target.files[0])}
              required
            />
          </div>
        ))}

        <button type="submit" style={{ padding: '10px 20px' }}>
          Subir Datos y Archivos
        </button>
      </form>
    </div>
  );
}

export default FormularioProveedor;

