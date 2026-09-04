import { validarNuevaConsulta } from '../DTOs/CrearConsultaDto.js';
import { obtenerCamposPermitidos, validarActualizacion } from '../DTOs/ActualizarConsultaDto.js';
import { ErrorServicio } from '../Services/ConsultaService.js';

function respuesta(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function idValido(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export class ConsultasController {
  constructor(service) {
    this.service = service;
  }

  registrar(req, res, body) {
    const errores = validarNuevaConsulta(body);
    if (errores.length) return respuesta(res, 400, { estatus: 'error', codigo: 'VALIDATION_ERROR', mensaje: 'Hay datos invalidos', detalles: errores });

    const consulta = this.service.registrar(body);
    return respuesta(res, 201, { estatus: 'exito', mensaje: 'Consulta registrada correctamente', data: consulta });
  }

  obtener(req, res, idParam) {
    const id = idValido(idParam);
    if (!id) return respuesta(res, 400, { estatus: 'error', codigo: 'VALIDATION_ERROR', mensaje: 'El id no es valido' });
    return respuesta(res, 200, { estatus: 'exito', data: this.service.obtener(id) });
  }

  historial(req, res, pacienteIdParam) {
    const pacienteId = idValido(pacienteIdParam);
    if (!pacienteId) return respuesta(res, 400, { estatus: 'error', codigo: 'VALIDATION_ERROR', mensaje: 'El id del paciente no es valido' });
    return respuesta(res, 200, { estatus: 'exito', data: this.service.historial(pacienteId) });
  }

  actualizar(req, res, idParam, body) {
    const id = idValido(idParam);
    if (!id) return respuesta(res, 400, { estatus: 'error', codigo: 'VALIDATION_ERROR', mensaje: 'El id no es valido' });

    const errores = validarActualizacion(body);
    if (errores.length) return respuesta(res, 400, { estatus: 'error', codigo: 'VALIDATION_ERROR', mensaje: 'Hay datos invalidos', detalles: errores });
    return respuesta(res, 200, { estatus: 'exito', mensaje: 'Consulta actualizada correctamente', data: this.service.actualizar(id, obtenerCamposPermitidos(body)) });
  }

  manejarError(res, error) {
    if (error instanceof ErrorServicio) {
      return respuesta(res, error.status, { estatus: 'error', codigo: error.code, mensaje: error.message, detalles: error.details });
    }
    console.error(error);
    return respuesta(res, 500, { estatus: 'error', codigo: 'INTERNAL_ERROR', mensaje: 'Ocurrio un error al procesar la solicitud' });
  }
}

