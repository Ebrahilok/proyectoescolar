export class ErrorServicio extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class ConsultaService {
  constructor(consultaRepository, pacienteRepository, medicoRepository) {
    this.consultas = consultaRepository;
    this.pacientes = pacienteRepository;
    this.medicos = medicoRepository;
  }

  registrar(datos) {
    const paciente = this.pacientes.obtenerPorId(datos.pacienteId);
    if (!paciente || !paciente.activo) throw new ErrorServicio(404, 'RESOURCE_NOT_FOUND', 'El paciente no existe o esta inactivo');

    const medico = this.medicos.obtenerPorId(datos.medicoId);
    if (!medico) throw new ErrorServicio(404, 'RESOURCE_NOT_FOUND', 'El medico no existe');
    if (!medico.activo) throw new ErrorServicio(409, 'CONFLICT', 'El medico seleccionado esta inactivo');

    return this.consultas.crear(datos);
  }

  obtener(id) {
    const consulta = this.consultas.obtenerPorId(id);
    if (!consulta) throw new ErrorServicio(404, 'RESOURCE_NOT_FOUND', 'La consulta no existe');
    return consulta;
  }

  historial(pacienteId) {
    const paciente = this.pacientes.obtenerPorId(pacienteId);
    if (!paciente) throw new ErrorServicio(404, 'RESOURCE_NOT_FOUND', 'El paciente no existe');
    return this.consultas.obtenerHistorial(pacienteId);
  }

  actualizar(id, campos) {
    this.obtener(id);
    return this.consultas.actualizar(id, campos);
  }
}

