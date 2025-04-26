// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta para registro de proveedor
router.post('/register', (req, res) => {
  const { ruc, password } = req.body;

  if (!ruc || !password) {
    return res.status(400).json({ message: 'RUC y contraseña son obligatorios' });
  }

  const proveedor = { ruc, password };

  const uploadsDir = path.join(__dirname, '..', 'uploads');

  // Asegurar que la carpeta /uploads exista
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, `${ruc}.json`);

  fs.writeFile(filePath, JSON.stringify(proveedor, null, 2), (err) => {
    if (err) {
      console.error('Error guardando proveedor:', err);
      return res.status(500).json({ message: 'Error al guardar proveedor' });
    }
    res.status(201).json({ message: 'Proveedor registrado exitosamente' });
  });
});

// Ruta para login de proveedor
router.post('/login', (req, res) => {
  const { ruc, password } = req.body;

  if (!ruc || !password) {
    return res.status(400).json({ message: 'RUC y contraseña son obligatorios' });
  }

  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const filePath = path.join(uploadsDir, `${ruc}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Proveedor no encontrado' });
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (data.password !== password) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  res.status(200).json({ message: 'Login exitoso' });
});

module.exports = router;

