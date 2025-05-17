const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Datos en memoria
let productos = [
  { nombre: "Producto de ejemplo", precio: 100 }
];

// Configuración
app.use(cors());
app.use(express.json());

// Rutas
app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  productos.push({ nombre, precio });
  res.status(201).json({ mensaje: 'Producto agregado' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
