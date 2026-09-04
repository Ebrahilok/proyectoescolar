import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const databaseDirectory = resolve(currentDirectory, '../../database');

export function createDatabase(fileName = resolve(currentDirectory, '../../data/medico.db')) {
  if (fileName !== ':memory:') {
    mkdirSync(dirname(fileName), { recursive: true });
  }

  const database = new DatabaseSync(fileName);
  database.exec('PRAGMA foreign_keys = ON;');
  database.exec(readFileSync(resolve(databaseDirectory, 'schema.sql'), 'utf8'));
  database.exec(readFileSync(resolve(databaseDirectory, 'seed.sql'), 'utf8'));
  return database;
}

