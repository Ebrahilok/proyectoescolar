export function mapMedico(row) {
  if (!row) return null;

  return {
    id: row.id,
    cedula: row.cedula,
    nombreCompleto: row.nombre_completo,
    especialidad: row.especialidad,
    telefono: row.telefono,
    correo: row.correo,
    activo: Boolean(row.activo)
  };
}

