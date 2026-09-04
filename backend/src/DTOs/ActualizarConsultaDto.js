const camposPermitidos = ['motivo', 'sintomas', 'diagnostico', 'tratamiento', 'observaciones', 'prioridad'];

export function validarActualizacion(body = {}) {
  const errores = [];
  const campos = Object.keys(body);

  if (campos.length === 0) errores.push('debe enviar al menos un campo para actualizar');
  if (campos.some((campo) => !camposPermitidos.includes(campo))) errores.push('solo se pueden modificar los datos clinicos de la consulta');
  if (body.motivo !== undefined && (typeof body.motivo !== 'string' || body.motivo.trim().length < 3 || body.motivo.trim().length > 200)) errores.push('motivo debe tener entre 3 y 200 caracteres');
  if (body.sintomas !== undefined && (typeof body.sintomas !== 'string' || body.sintomas.trim().length < 10)) errores.push('sintomas debe tener al menos 10 caracteres');
  if (body.diagnostico !== undefined && (typeof body.diagnostico !== 'string' || body.diagnostico.trim().length < 5)) errores.push('diagnostico debe tener al menos 5 caracteres');
  if (body.prioridad !== undefined && !['baja', 'media', 'alta'].includes(body.prioridad)) errores.push('prioridad debe ser baja, media o alta');

  return errores;
}

export function obtenerCamposPermitidos(body) {
  return Object.fromEntries(Object.entries(body).filter(([campo]) => camposPermitidos.includes(campo)));
}

