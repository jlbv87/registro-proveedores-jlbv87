const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configurar Multer para guardar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Ruta para recibir formulario
app.post('/api/proveedores', upload.array('archivos'), (req, res) => {
  try {
    // Guardar los datos en un JSON
    const datosProveedor = {
      empresa: req.body.empresa,
      ruc: req.body.ruc,
      contacto: req.body.contacto,
      correo: req.body.correo,
      dni: req.body.dni,
      telefono: req.body.telefono,
      categoria: req.body.categoria,
      archivos: req.files.map(file => file.filename)
    };

    const filePath = `uploads/${datosProveedor.ruc}_${Date.now()}.json`;
    fs.writeFileSync(filePath, JSON.stringify(datosProveedor, null, 2));

    res.status(200).json({ message: 'Proveedor registrado exitosamente' });
  } catch (error) {
    console.error('Error guardando proveedor:', error);
    res.status(500).json({ message: 'Error procesando la solicitud' });
  }
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Nueva ruta: Listar archivos en /uploads
app.get('/api/proveedores/uploads', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error leyendo la carpeta uploads:', err);
      return res.status(500).json({ message: 'Error leyendo los archivos' });
    }

    const listaArchivos = files.filter(file => 
      file.endsWith('.pdf') || file.endsWith('.json')
    );

    res.json(listaArchivos);
  });
});
