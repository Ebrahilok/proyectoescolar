import { createDatabase } from './database/createDatabase.js';
import { createApp } from './app.js';

const port = Number(process.env.PORT) || 3000;
const database = createDatabase();
const server = createApp(database);

server.listen(port, () => {
  console.log(`API medica disponible en http://localhost:${port}/api/v1`);
});

function cerrar() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on('SIGINT', cerrar);
process.on('SIGTERM', cerrar);

