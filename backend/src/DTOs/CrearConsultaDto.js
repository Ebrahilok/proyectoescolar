const prioridades = ['baja', 'media', 'alta'];

export function validarNuevaConsulta(body = {}) {
  const errores = [];

  if (!Number.isInteger(body.pacienteId) || body.pacienteId < 1) errores.push('pacienteId debe ser un numero entero valido');
  if (!Number.isInteger(body.medicoId) || body.medicoId < 1) errores.push('medicoId debe ser un numero entero valido');
  if (!body.motivo?.trim() || body.motivo.trim().length < 3 || body.motivo.trim().length > 200) errores.push('motivo debe tener entre 3 y 200 caracteres');
  if (!body.sintomas?.trim() || body.sintomas.trim().length < 10) errores.push('sintomas debe tener al menos 10 caracteres');
  if (!body.diagnostico?.trim() || body.diagnostico.trim().length < 5) errores.push('diagnostico debe tener al menos 5 caracteres');
  if (body.prioridad && !prioridades.includes(body.prioridad)) errores.push('prioridad debe ser baja, media o alta');

  return errores;
}

