import { createServer } from 'node:http';
import { ConsultaRepository } from './Repositories/ConsultaRepository.js';
import { PacienteRepository } from './Repositories/PacienteRepository.js';
import { MedicoRepository } from './Repositories/MedicoRepository.js';
import { ConsultaService } from './Services/ConsultaService.js';
import { CatalogoService } from './Services/CatalogoService.js';
import { ConsultasController } from './Controllers/ConsultasController.js';
import { CatalogosController } from './Controllers/CatalogosController.js';

function enviar(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

async function leerJson(req) {
  const partes = [];
  let total = 0;
  for await (const parte of req) {
    total += parte.length;
    if (total > 1_000_000) throw new Error('PAYLOAD_GRANDE');
    partes.push(parte);
  }
  if (!partes.length) return {};
  return JSON.parse(Buffer.concat(partes).toString('utf8'));
}

export function createApp(database) {
  const pacientes = new PacienteRepository(database);
  const medicos = new MedicoRepository(database);
  const consultas = new ConsultaRepository(database);
  const consultaController = new ConsultasController(new ConsultaService(consultas, pacientes, medicos));
  const catalogoController = new CatalogosController(new CatalogoService(pacientes, medicos));

  return createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname.replace(/\/$/, '') || '/';

    try {
      if (req.method === 'GET' && path === '/api/v1/salud') return enviar(res, 200, { estatus: 'exito', mensaje: 'API funcionando' });
      if (req.method === 'GET' && path === '/api/v1/pacientes') return catalogoController.pacientes(req, res);
      if (req.method === 'GET' && path === '/api/v1/medicos') return catalogoController.medicos(req, res);

      const historial = path.match(/^\/api\/v1\/pacientes\/(\d+)\/consultas$/);
      if (req.method === 'GET' && historial) return consultaController.historial(req, res, historial[1]);

      const consulta = path.match(/^\/api\/v1\/consultas\/(\d+)$/);
      if (req.method === 'GET' && consulta) return consultaController.obtener(req, res, consulta[1]);
      if (req.method === 'PATCH' && consulta) return consultaController.actualizar(req, res, consulta[1], await leerJson(req));
      if (req.method === 'POST' && path === '/api/v1/consultas') return consultaController.registrar(req, res, await leerJson(req));

      return enviar(res, 404, { estatus: 'error', codigo: 'RESOURCE_NOT_FOUND', mensaje: 'La ruta solicitada no existe' });
    } catch (error) {
      if (error instanceof SyntaxError) return enviar(res, 400, { estatus: 'error', codigo: 'VALIDATION_ERROR', mensaje: 'El cuerpo debe ser un JSON valido' });
      if (error.message === 'PAYLOAD_GRANDE') return enviar(res, 413, { estatus: 'error', codigo: 'PAYLOAD_TOO_LARGE', mensaje: 'El cuerpo de la solicitud es demasiado grande' });
      return consultaController.manejarError(res, error);
    }
  });
}

