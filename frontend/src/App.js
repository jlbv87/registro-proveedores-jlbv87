import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({});
  const [archivos, setArchivos] = useState({});

  const categorias = [
    "Cocina - Cubertería",
    "Cocina - Implementos lonchera fría",
    "Cocina - Jabas",
    "Cocina - Manipuleo",
    "Cocina - Equipos de pastelería",
  ];

  const documentos = [
    "Ficha de proveedor",
    "Acuerdo comercial",
    "Referencias comerciales",
    "Factura en blanco",
    "Encabezado del estado de cuenta",
    "Ficha RUC",
    "Licencia de funcionamiento o DJ",
    "Constancia DJ anual SUNAT",
    "Declaración jurada del proveedor",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, key) => {
    setArchivos({ ...archivos, [key]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado correctamente (simulado).');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Registro de Proveedores 🚀</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la empresa:</label>
          <input type="text" name="empresa" onChange={handleInputChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>

        <div>
          <label>RUC (11 dígitos):</label>
          <input type="text" name="ruc" maxLength="11" onChange={handleInputChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>

        <div>
          <label>Nombre del contacto:</label>
          <input type="text" name="contacto" onChange={handleInputChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>

        <div>
          <label>Correo corporativo:</label>
          <input type="email" name="correo" onChange={handleInputChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>

        <div>
          <label>DNI (8 dígitos):</label>
          <input type="text" name="dni" maxLength="8" onChange={handleInputChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>

        <div>
          <label>Teléfono:</label>
          <input type="text" name="telefono" onChange={handleInputChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
        </div>

        <div>
          <label>Categoría:</label>
          <select name="categoria" onChange={handleInputChange} required style={{ width: '100%', padding: '8px', margin: '8px 0' }}>
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 style={{ marginTop: '20px' }}>Subir documentos (PDF):</h3>
          {documentos.map((doc, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <label>{doc}:</label>
              <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, doc)} required style={{ width: '100%', padding: '8px' }} />
            </div>
          ))}
        </div>

        <button type="submit" style={{ marginTop: '20px', padding: '12px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', width: '100%', cursor: 'pointer' }}>
          Enviar formulario
        </button>
      </form>
    </div>
  );
}

export default App;

