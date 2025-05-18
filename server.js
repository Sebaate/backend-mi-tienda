const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://admin:<db_password>@cluster0.jfkhlim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // pega tu URI de MongoDB Atlas aquí
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/productos', async (req, res) => {
  try {
    await client.connect();
    const productos = await client.db("tienda").collection("productos").find().toArray();
    res.json(productos);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.post('/productos', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    await client.connect();
    await client.db("tienda").collection("productos").insertOne({ nombre, precio });
    res.status(201).json({ mensaje: 'Producto guardado' });
  } catch (e) {
    res.status(500).json({ error: 'Error al guardar producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
