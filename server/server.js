const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postmed',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 5432,
});

// Test DB Connection & Init
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Connected to Database:', result.rows[0]);

        // Initialize DB
        try {
            const sql = fs.readFileSync(path.join(__dirname, 'database.sql')).toString();
            pool.query(sql);
            console.log("Database tables checked/created successfully.");
        } catch (dbErr) {
            console.error("Error initializing database:", dbErr);
        }
    });
});

// --- ROUTES ---

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            // Remove password from response
            delete user.password;
            res.json(user);
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register
app.post('/api/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email, rol',
            [nombre, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all patients
app.get('/api/pacientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pacientes ORDER BY creado_en DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single patient by ID
app.get('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create patient
app.post('/api/pacientes', async (req, res) => {
    const { nombre, apellido, fecha_nacimiento, contacto } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pacientes (nombre, apellido, fecha_nacimiento, contacto) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, apellido, fecha_nacimiento, contacto]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get wounds for a patient
app.get('/api/pacientes/:id/heridas', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM heridas WHERE paciente_id = $1 ORDER BY creado_en DESC', [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create wound
app.post('/api/heridas', async (req, res) => {
    const { paciente_id, ubicacion, tipo, estado } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO heridas (paciente_id, ubicacion, tipo, estado) VALUES ($1, $2, $3, $4) RETURNING *',
            [paciente_id, ubicacion, tipo, estado || 'Activo']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('PostMed API is running');
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
