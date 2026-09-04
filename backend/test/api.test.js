import test from 'node:test';
import assert from 'node:assert/strict';
import { createDatabase } from '../src/database/createDatabase.js';
import { createApp } from '../src/app.js';

async function iniciarApi() {
  const database = createDatabase(':memory:');
  const server = createApp(database);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}`,
    cerrar: async () => {
      await new Promise((resolve) => server.close(resolve));
      database.close();
    }
  };
}

test('registra una consulta y regresa paciente y medico', async () => {
  const api = await iniciarApi();
  try {
    const response = await fetch(`${api.url}/api/v1/consultas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pacienteId: 2,
        medicoId: 1,
        motivo: 'Dolor en la espalda',
        sintomas: 'Dolor despues de realizar ejercicio',
        diagnostico: 'Contractura muscular',
        tratamiento: 'Reposo durante tres dias',
        prioridad: 'baja'
      })
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.data.paciente.id, 2);
    assert.equal(body.data.medico.id, 1);
    assert.ok(body.data.fechaHora);
  } finally {
    await api.cerrar();
  }
});

test('rechaza una consulta si el medico esta inactivo', async () => {
  const api = await iniciarApi();
  try {
    const response = await fetch(`${api.url}/api/v1/consultas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pacienteId: 1, medicoId: 3, motivo: 'Revision general', sintomas: 'Cansancio desde hace varios dias', diagnostico: 'Fatiga general' })
    });
    const body = await response.json();

    assert.equal(response.status, 409);
    assert.equal(body.codigo, 'CONFLICT');
  } finally {
    await api.cerrar();
  }
});

test('consulta un registro con sus relaciones', async () => {
  const api = await iniciarApi();
  try {
    const response = await fetch(`${api.url}/api/v1/consultas/1`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.data.paciente.matricula, '2023-A001');
    assert.equal(body.data.medico.cedula, 'MED-784512');
  } finally {
    await api.cerrar();
  }
});

test('regresa el historial del mas reciente al mas antiguo', async () => {
  const api = await iniciarApi();
  try {
    const response = await fetch(`${api.url}/api/v1/pacientes/1/consultas`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.data.length, 2);
    assert.ok(body.data[0].fechaHora > body.data[1].fechaHora);
  } finally {
    await api.cerrar();
  }
});

test('permite corregir datos clinicos sin cambiar la fecha', async () => {
  const api = await iniciarApi();
  try {
    const anterior = await (await fetch(`${api.url}/api/v1/consultas/1`)).json();
    const response = await fetch(`${api.url}/api/v1/consultas/1`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diagnostico: 'Migrana sin aura', prioridad: 'alta' })
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.data.diagnostico, 'Migrana sin aura');
    assert.equal(body.data.fechaHora, anterior.data.fechaHora);
  } finally {
    await api.cerrar();
  }
});

