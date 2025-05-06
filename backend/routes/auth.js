// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta de prueba
router.get('/ping', (req, res) => {
  res.json({ message: 'Servidor activo ✅' });
});

// Ruta de registro
router.post('/registro', (req, res) => {
  try {
    const { ruc, password } = req.body;

    if (!ruc || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const filePath = path.join(__dirname, '..', 'proveedores.json');

    let proveedores = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      proveedores = data ? JSON.parse(data) : [];
    }

    const existe = proveedores.some(p => p.ruc === ruc);
    if (existe) {
      return res.status(409).json({ message: 'Proveedor ya existe' });
    }

    proveedores.push({ ruc, password });
    fs.writeFileSync(filePath, JSON.stringify(proveedores, null, 2));

    return res.status(201).json({ message: 'Proveedor registrado correctamente ✅' });
  } catch (error) {
    console.error('Error en el backend:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
