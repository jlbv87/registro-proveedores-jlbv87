import React, { useEffect, useState } from 'react';

function DashboardComprador() {
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    const autenticado = localStorage.getItem('comprador_autenticado');
    if (!autenticado) {
      window.location.href = '/comprador';
    } else {
      fetch('https://registro-proveedores-backend.onrender.com/api/proveedores/uploads')
        .then((res) => res.json())
        .then((data) => setArchivos(data))
        .catch((err) => console.error('Error leyendo archivos:', err));
    }
  }, []);

  const abrirArchivo = (nombreArchivo) => {
    const url = `https://registro-proveedores-backend.onrender.com/uploads/${nombreArchivo}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Archivos Cargados por Proveedores</h1>
      <ul>
        {archivos.map((archivo, index) => (
          <li key={index}>
            <button onClick={() => abrirArchivo(archivo)} style={{ textDecoration: 'underline', color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
              {archivo}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardComprador;
