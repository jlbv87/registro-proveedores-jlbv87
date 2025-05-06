// frontend/src/pages/DashboardComprador.js

import React, { useEffect, useState } from 'react';

function DashboardComprador() {
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const response = await fetch('https://registro-proveedores-backend.onrender.com/api/proveedores/uploads');
        const data = await response.json();
        setArchivos(data);
      } catch (error) {
        console.error('Error cargando archivos:', error);
      }
    };

    fetchArchivos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel del Comprador</h1>
      {archivos.length === 0 ? (
        <p>No hay archivos aún.</p>
      ) : (
        <ul>
          {archivos.map((archivo, index) => (
            <li key={index}>
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
      )}
    </div>
  );
}

export default DashboardComprador;
