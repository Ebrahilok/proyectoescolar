PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula TEXT NOT NULL UNIQUE,
    nombre_completo TEXT NOT NULL,
    fecha_nacimiento TEXT NOT NULL,
    telefono TEXT,
    correo TEXT NOT NULL UNIQUE,
    carrera TEXT NOT NULL,
    tipo_sangre TEXT,
    alergias TEXT,
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

CREATE TABLE IF NOT EXISTS medicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cedula TEXT NOT NULL UNIQUE,
    nombre_completo TEXT NOT NULL,
    especialidad TEXT NOT NULL,
    telefono TEXT,
    correo TEXT NOT NULL UNIQUE,
    activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

CREATE TABLE IF NOT EXISTS consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    fecha_hora TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT NOT NULL CHECK (length(trim(motivo)) BETWEEN 3 AND 200),
    sintomas TEXT NOT NULL CHECK (length(trim(sintomas)) >= 10),
    diagnostico TEXT NOT NULL CHECK (length(trim(diagnostico)) >= 5),
    tratamiento TEXT,
    observaciones TEXT,
    prioridad TEXT NOT NULL DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES medicos(id)
);

CREATE INDEX IF NOT EXISTS idx_consultas_paciente_fecha
ON consultas(paciente_id, fecha_hora DESC);

CREATE INDEX IF NOT EXISTS idx_consultas_medico
ON consultas(medico_id);

