CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    contacto TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS heridas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES pacientes(id) ON DELETE CASCADE,
    ubicacion VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    estado VARCHAR(50) DEFAULT 'Activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evaluaciones (
    id SERIAL PRIMARY KEY,
    herida_id INTEGER REFERENCES heridas(id) ON DELETE CASCADE,
    fecha DATE DEFAULT CURRENT_DATE,
    largo_cm DECIMAL(5,2),
    ancho_cm DECIMAL(5,2),
    profundidad_cm DECIMAL(5,2),
    notas TEXT,
    url_imagen TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
