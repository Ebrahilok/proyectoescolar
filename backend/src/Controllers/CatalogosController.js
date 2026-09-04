function respuesta(res, body) {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ estatus: 'exito', data: body }));
}

export class CatalogosController {
  constructor(service) {
    this.service = service;
  }

  pacientes(req, res) {
    return respuesta(res, this.service.obtenerPacientes());
  }

  medicos(req, res) {
    return respuesta(res, this.service.obtenerMedicos());
  }
}

