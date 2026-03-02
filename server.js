const express = require('express');
const cors = require('cors');
const connDB = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// ================= SYNC GET ROUTES =================

// 1. Obtener todos los actores
app.get('/actores', (req, res) => {
    connDB.query('SELECT * FROM actor LIMIT 20', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. Obtener películas y su descripción
app.get('/peliculas', (req, res) => {
    connDB.query('SELECT title, description, release_year FROM film LIMIT 10', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 3. Listar todas las categorías de películas
app.get('/categorias', (req, res) => {
    connDB.query('SELECT * FROM category', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 4. Ver clientes activos
app.get('/clientes-activos', (req, res) => {
    connDB.query('SELECT first_name, last_name, email FROM customer WHERE active = 1', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 5. Ver inventario de una tienda específica (Tienda 1)
app.get('/inventario-tienda', (req, res) => {
    connDB.query('SELECT * FROM inventory WHERE store_id = 1 LIMIT 5', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// ================= SYNC POST ROUTES =================

// 1. Insertar un nuevo actor
app.post('/nuevo-actor', (req, res) => {
    const { first_name, last_name } = req.body;
    const sql = 'INSERT INTO actor (first_name, last_name) VALUES (?, ?)';
    connDB.query(sql, [first_name, last_name], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Actor creado', id: result.insertId });
    });
});

// 2. Agregar una nueva categoría
app.post('/nueva-categoria', (req, res) => {
    const { name } = req.body;
    connDB.query('INSERT INTO category (name) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Categoría agregada', id: result.insertId });
    });
});

// 3. Buscar películas por año (vía POST para enviar datos sensibles o complejos)
app.post('/buscar-pelicula-año', (req, res) => {
    const { anio } = req.body;
    connDB.query('SELECT title FROM film WHERE release_year = ?', [anio], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 4. Simular registro de una renta
app.post('/rentar', (req, res) => {
    const { customer_id, inventory_id, staff_id } = req.body;
    const sql = 'INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES (NOW(), ?, ?, ?)';
    connDB.query(sql, [inventory_id, customer_id, staff_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensaje: 'Renta procesada con éxito' });
    });
});

// 5. Filtrar clientes por apellido
app.post('/buscar-cliente', (req, res) => {
    const { apellido } = req.body;
    connDB.query('SELECT * FROM customer WHERE last_name LIKE ?', [`%${apellido}%`], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});