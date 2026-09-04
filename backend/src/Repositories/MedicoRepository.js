import { mapMedico } from '../Models/Medico.js';

export class MedicoRepository {
  constructor(database) {
    this.database = database;
  }

  obtenerPorId(id) {
    return mapMedico(this.database.prepare('SELECT * FROM medicos WHERE id = ?').get(id));
  }

  obtenerActivos() {
    return this.database.prepare('SELECT * FROM medicos WHERE activo = 1 ORDER BY nombre_completo').all().map(mapMedico);
  }
}

