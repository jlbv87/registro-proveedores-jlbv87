// backend/server.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());

// Carpeta pública para los archivos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de autenticación
app.use('/api', authRoutes);

// Ruta simple para verificar que el servidor está vivo
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Servidor activo ✅' });
});

// Configurar Multer para carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Ruta para carga de documentos de proveedores
app.post('/api/proveedores', upload.array('archivos'), (req, res) => {
  try {
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

    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${datosProveedor.ruc}_${Date.now()}.json`);
    fs.writeFileSync(filePath, JSON.stringify(datosProveedor, null, 2));

    res.status(200).json({ message: 'Proveedor registrado exitosamente' });
  } catch (error) {
    console.error('Error guardando proveedor:', error);
    res.status(500).json({ message: 'Error procesando la solicitud' });
  }
});

// Nueva ruta para listar archivos subidos
app.get('/api/uploads', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error leyendo uploads:', err);
      return res.status(500).json({ message: 'Error leyendo uploads' });
    }

    const fileUrls = files.map(file => `https://registro-proveedores-backend.onrender.com/uploads/${file}`);
    res.json(fileUrls);
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
