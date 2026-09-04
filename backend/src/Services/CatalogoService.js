export class CatalogoService {
  constructor(pacienteRepository, medicoRepository) {
    this.pacientes = pacienteRepository;
    this.medicos = medicoRepository;
  }

  obtenerPacientes() {
    return this.pacientes.obtenerTodos();
  }

  obtenerMedicos() {
    return this.medicos.obtenerActivos();
  }
}

