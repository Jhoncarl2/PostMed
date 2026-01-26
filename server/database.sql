-- Users Table
CREATE TABLE IF NOT EXISTS public.usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE IF NOT EXISTS public.pacientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    contacto TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wounds Table
CREATE TABLE IF NOT EXISTS public.heridas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES public.pacientes(id) ON DELETE CASCADE,
    ubicacion VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    estado VARCHAR(50) DEFAULT 'Activo',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Evaluations Table
CREATE TABLE IF NOT EXISTS public.evaluaciones (
    id SERIAL PRIMARY KEY,
    herida_id INTEGER REFERENCES public.heridas(id) ON DELETE CASCADE,
    fecha DATE DEFAULT CURRENT_DATE,
    largo_cm NUMERIC(5,2),
    ancho_cm NUMERIC(5,2),
    profundidad_cm NUMERIC(5,2),
    notas TEXT,
    url_imagen TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Admin User (only if table is empty)
INSERT INTO public.usuarios (nombre, email, password, rol)
SELECT 'Administrador', 'admin@postmed.com', '123456', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM public.usuarios WHERE email = 'admin@postmed.com');
