# Sistema medico universitario

Primera implementacion funcional del modulo de consultas e historial medico. El backend permite registrar consultas, consultar una consulta especifica y revisar el historial de un paciente, incluyendo los datos del paciente y del medico responsable.

## Tecnologias

- Node.js 22.5 o superior
- SQLite
- SQL directo mediante el modulo nativo `node:sqlite`

## Estructura

El proyecto se separo en Controllers, Services, Repositories, Models y DTOs. Los Controllers reciben las solicitudes HTTP, los Services aplican las validaciones del sistema y los Repositories ejecutan las consultas a SQLite.

Antes de registrar una consulta se comprueba que el paciente exista y que el medico se encuentre activo. La fecha de registro se asigna desde el servidor.

## Como ejecutar

```bash
cd backend
npm start
```

La base de datos se crea automaticamente en `backend/data/medico.db` con pacientes, medicos y consultas de prueba. La API queda disponible en `http://localhost:3000/api/v1`.

## Rutas disponibles

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

## Pruebas

```bash
cd backend
npm test
```
