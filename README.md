# 🎓 Plataforma Escolar

Sistema web diseñado para la gestión escolar, permitiendo administrar alumnos, docentes, cursos y procesos académicos de forma eficiente.

## 🚀 Descripción

**PlataformaEscolar** es una aplicación orientada a facilitar la administración de instituciones educativas. Su objetivo es centralizar la información académica y mejorar la organización de datos como:

- Registro de estudiantes
- Gestión de profesores
- Control de materias/cursos
- Seguimiento académico

Este tipo de proyectos es común en entornos educativos donde herramientas como GitHub ayudan a colaborar y desarrollar software en equipo. :contentReference[oaicite:0]{index=0}

---

## 🛠️ Tecnologías utilizadas

- Lenguaje: JavaScript
- Otros: HTML, CSS

---

## Backend de consultas medicas

En la carpeta `backend` se encuentra la primera implementacion del modulo de consultas e historial medico. Se uso Node.js con SQLite porque permite trabajar con SQL directo y no necesita instalar paquetes adicionales.

La estructura se separo en Controllers, Services, Repositories, Models y DTOs. La fecha de cada consulta se asigna en el servidor y antes de guardar se revisa que el paciente exista y que el medico este activo.

### Como ejecutar

Se necesita Node.js 22.5 o una version mas reciente.

```bash
cd backend
npm start
```

La base de datos se crea automaticamente en `backend/data/medico.db` con pacientes, medicos y consultas de prueba. La API queda disponible en `http://localhost:3000/api/v1`.

### Rutas disponibles

- `GET /api/v1/pacientes`
- `GET /api/v1/medicos`
- `POST /api/v1/consultas`
- `GET /api/v1/consultas/{id}`
- `PATCH /api/v1/consultas/{id}`
- `GET /api/v1/pacientes/{id}/consultas`

Ejemplo para registrar una consulta:

```json
{
  "pacienteId": 1,
  "medicoId": 1,
  "motivo": "Dolor abdominal",
  "sintomas": "Nauseas y dolor desde la manana",
  "diagnostico": "Gastritis aguda",
  "tratamiento": "Omeprazol por siete dias",
  "observaciones": "Evitar alimentos irritantes",
  "prioridad": "media"
}
```

Para ejecutar las pruebas:

```bash
cd backend
npm test
```
