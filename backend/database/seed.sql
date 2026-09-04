INSERT OR IGNORE INTO pacientes
    (id, matricula, nombre_completo, fecha_nacimiento, telefono, correo, carrera, tipo_sangre, alergias)
VALUES
    (1, '2023-A001', 'Juan Perez Lopez', '2003-05-18', '6141234567', 'juan.perez@universidad.mx', 'Ingenieria de Software', 'O+', 'Ninguna'),
    (2, '2022-B014', 'Daniela Ruiz Soto', '2002-11-03', '6147654321', 'daniela.ruiz@universidad.mx', 'Administracion', 'A+', 'Penicilina'),
    (3, '2024-C008', 'Luis Mendoza Diaz', '2004-02-22', NULL, 'luis.mendoza@universidad.mx', 'Derecho', 'B+', NULL);

INSERT OR IGNORE INTO medicos
    (id, cedula, nombre_completo, especialidad, telefono, correo, activo)
VALUES
    (1, 'MED-784512', 'Dra. Laura Hernandez', 'Medicina General', '6141112233', 'laura.hernandez@universidad.mx', 1),
    (2, 'MED-963147', 'Dr. Carlos Ramirez', 'Medicina Interna', '6144445566', 'carlos.ramirez@universidad.mx', 1),
    (3, 'MED-258369', 'Dra. Sofia Torres', 'Psicologia Clinica', '6147778899', 'sofia.torres@universidad.mx', 0);

INSERT OR IGNORE INTO consultas
    (id, paciente_id, medico_id, fecha_hora, motivo, sintomas, diagnostico, tratamiento, observaciones, prioridad, created_at, updated_at)
VALUES
    (1, 1, 1, '2026-08-21T16:30:00.000Z', 'Dolor de cabeza', 'Dolor constante y sensibilidad a la luz', 'Cefalea tensional', 'Paracetamol y reposo', 'Regresar si el dolor continua', 'media', '2026-08-21T16:30:00.000Z', '2026-08-21T16:30:00.000Z'),
    (2, 1, 2, '2026-08-28T18:10:00.000Z', 'Malestar estomacal', 'Nauseas y dolor abdominal desde ayer', 'Gastritis aguda', 'Omeprazol por siete dias', 'Evitar alimentos irritantes', 'baja', '2026-08-28T18:10:00.000Z', '2026-08-28T18:10:00.000Z'),
    (3, 2, 1, '2026-08-30T15:45:00.000Z', 'Dolor de garganta', 'Dolor al pasar alimentos y fiebre leve', 'Faringitis viral', 'Hidratacion y reposo', NULL, 'media', '2026-08-30T15:45:00.000Z', '2026-08-30T15:45:00.000Z');

