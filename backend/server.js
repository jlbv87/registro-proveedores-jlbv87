const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.send('API de Registro de Proveedores funcionando 🚀');
});

app.post('/api/proveedor', (req, res) => {
  res.status(200).json({ message: 'Proveedor registrado (mock)' });
});

app.post('/api/proveedor/:id/upload', upload.array('archivos'), async (req, res) => {
  res.status(200).json({ message: 'Archivos subidos (mock)' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));