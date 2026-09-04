export function mapPaciente(row) {
  if (!row) return null;

  return {
    id: row.id,
    matricula: row.matricula,
    nombreCompleto: row.nombre_completo,
    fechaNacimiento: row.fecha_nacimiento,
    telefono: row.telefono,
    correo: row.correo,
    carrera: row.carrera,
    tipoSangre: row.tipo_sangre,
    alergias: row.alergias,
    activo: Boolean(row.activo)
  };
}

