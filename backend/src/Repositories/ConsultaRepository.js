import { mapConsulta } from '../Models/Consulta.js';

const detalleConsulta = `
  SELECT c.*,
         p.matricula, p.nombre_completo AS paciente_nombre, p.correo AS paciente_correo,
         m.cedula, m.nombre_completo AS medico_nombre, m.especialidad
  FROM consultas c
  INNER JOIN pacientes p ON p.id = c.paciente_id
  INNER JOIN medicos m ON m.id = c.medico_id
`;

function mapDetalle(row) {
  if (!row) return null;
  return {
    ...mapConsulta(row),
    paciente: {
      id: row.paciente_id,
      matricula: row.matricula,
      nombreCompleto: row.paciente_nombre,
      correo: row.paciente_correo
    },
    medico: {
      id: row.medico_id,
      cedula: row.cedula,
      nombreCompleto: row.medico_nombre,
      especialidad: row.especialidad
    }
  };
}

export class ConsultaRepository {
  constructor(database) {
    this.database = database;
  }

  crear(datos) {
    const fecha = new Date().toISOString();
    const resultado = this.database.prepare(`
      INSERT INTO consultas
        (paciente_id, medico_id, fecha_hora, motivo, sintomas, diagnostico, tratamiento, observaciones, prioridad, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      datos.pacienteId,
      datos.medicoId,
      fecha,
      datos.motivo.trim(),
      datos.sintomas.trim(),
      datos.diagnostico.trim(),
      datos.tratamiento?.trim() || null,
      datos.observaciones?.trim() || null,
      datos.prioridad || 'media',
      fecha,
      fecha
    );

    return this.obtenerPorId(Number(resultado.lastInsertRowid));
  }

  obtenerPorId(id) {
    return mapDetalle(this.database.prepare(`${detalleConsulta} WHERE c.id = ?`).get(id));
  }

  obtenerHistorial(pacienteId) {
    return this.database.prepare(`${detalleConsulta} WHERE c.paciente_id = ? ORDER BY c.fecha_hora DESC`).all(pacienteId).map(mapDetalle);
  }

  actualizar(id, campos) {
    const nombres = Object.keys(campos);
    const nombreSql = {
      motivo: 'motivo',
      sintomas: 'sintomas',
      diagnostico: 'diagnostico',
      tratamiento: 'tratamiento',
      observaciones: 'observaciones',
      prioridad: 'prioridad'
    };
    const asignaciones = nombres.map((nombre) => `${nombreSql[nombre]} = ?`);
    const valores = nombres.map((nombre) => typeof campos[nombre] === 'string' ? campos[nombre].trim() || null : campos[nombre]);

    asignaciones.push('updated_at = ?');
    valores.push(new Date().toISOString(), id);
    this.database.prepare(`UPDATE consultas SET ${asignaciones.join(', ')} WHERE id = ?`).run(...valores);
    return this.obtenerPorId(id);
  }
}

