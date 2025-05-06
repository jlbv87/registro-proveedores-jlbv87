// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta de prueba
router.get('/test', (req, res) => {
  res.send('Servidor backend operativo ✅');
});

// Ruta de registro de proveedor
router.post('/registro', (req, res) => {
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

  res.status(201).json({ message: 'Proveedor registrado correctamente ✅' });
});

// ✅ Ruta de login de proveedor
router.post('/login', (req, res) => {
  const { ruc, password } = req.body;

  if (!ruc || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const filePath = path.join(__dirname, '..', 'proveedores.json');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'No hay proveedores registrados' });
  }

  const data = fs.readFileSync(filePath, 'utf8');
  const proveedores = data ? JSON.parse(data) : [];

  const proveedor = proveedores.find(p => p.ruc === ruc && p.password === password);

  if (proveedor) {
    return res.status(200).json({ message: 'Login exitoso ✅' });
  } else {
    return res.status(401).json({ message: 'Credenciales incorrectas ❌' });
  }
});

// 🔍 Ruta opcional para ver proveedores registrados (solo para desarrollo)
router.get('/proveedores', (req, res) => {
  const filePath = path.join(__dirname, '..', 'proveedores.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const proveedores = data ? JSON.parse(data) : [];
    return res.json(proveedores);
  } else {
    return res.status(404).json({ message: 'Archivo no encontrado' });
  }
});

module.exports = router;
