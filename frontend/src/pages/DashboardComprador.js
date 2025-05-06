// frontend/src/pages/DashboardComprador.js

import React, { useEffect, useState } from 'react';

function DashboardComprador() {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch('https://registro-proveedores-backend.onrender.com/api/proveedores/uploads');
        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        console.error('Error cargando los archivos:', error);
      }
    };

    fetchProveedores();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel del Comprador</h1>
      {proveedores.length === 0 ? (
        <p>No hay documentos cargados aún.</p>
      ) : (
        <div>
          {proveedores.map((proveedor, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>RUC: {proveedor.ruc}</h3>
              <ul>
                {proveedor.archivos.map((archivo, i) => (
                  <li key={i}>
                    <a
                      href={`https://registro-proveedores-backend.onrender.com/uploads/${archivo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {archivo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardComprador;

