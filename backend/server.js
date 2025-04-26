// Nueva ruta: Lista de archivos clickeables
app.get('/api/proveedores/uploads', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error leyendo la carpeta uploads:', err);
      return res.status(500).send('Error leyendo los archivos');
    }

    const listaArchivos = files.filter(file =>
      file.endsWith('.pdf') || file.endsWith('.json')
    );

    const links = listaArchivos.map(file => {
      return `<li><a href="/uploads/${encodeURIComponent(file)}" target="_blank">${file}</a></li>`;
    }).join('');

    res.send(`
      <html>
        <head><title>Documentos Subidos</title></head>
        <body>
          <h1>Lista de Archivos Disponibles</h1>
          <ul>${links}</ul>
        </body>
      </html>
    `);
  });
});

