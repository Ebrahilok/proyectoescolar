export function mapConsulta(row) {
  if (!row) return null;

  return {
    id: row.id,
    pacienteId: row.paciente_id,
    medicoId: row.medico_id,
    fechaHora: row.fecha_hora,
    motivo: row.motivo,
    sintomas: row.sintomas,
    diagnostico: row.diagnostico,
    tratamiento: row.tratamiento,
    observaciones: row.observaciones,
    prioridad: row.prioridad,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

