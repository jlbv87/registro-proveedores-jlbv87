const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');

const router = express.Router();
const usuariosPath = path.join(__dirname, '../uploads/usuarios.json');

// Crear archivo usuarios.json si no existe
if (!fs.existsSync(usuariosPath)) {
  fs.writeFileSync(usuariosPath, JSON.stringify([]));
}

// Registro de proveedor
router.post('/register', async (req, res) => {
  const { ruc, password } = req.body;

  if (!ruc || !password) {
    return res.status(400).json({ message: 'RUC y contraseña son obligatorios' });
  }

  const usuarios = JSON.parse(fs.readFileSync(usuariosPath));
  const existe = usuarios.find(u => u.ruc === ruc);

  if (existe) {
    return res.status(400).json({ message: 'El RUC ya está registrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  usuarios.push({ ruc, password: hashedPassword });
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

  res.status(200).json({ message: 'Proveedor registrado exitosamente' });
});

module.exports = router;
