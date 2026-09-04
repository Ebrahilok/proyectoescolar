import { mapPaciente } from '../Models/Paciente.js';

export class PacienteRepository {
  constructor(database) {
    this.database = database;
  }

  obtenerPorId(id) {
    return mapPaciente(this.database.prepare('SELECT * FROM pacientes WHERE id = ?').get(id));
  }

  obtenerTodos() {
    return this.database.prepare('SELECT * FROM pacientes WHERE activo = 1 ORDER BY nombre_completo').all().map(mapPaciente);
  }
}

