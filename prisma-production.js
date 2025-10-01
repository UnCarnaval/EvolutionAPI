const { PrismaClient } = require('@prisma/client');

console.log('🔧 Configurando Prisma para producción...');
console.log('📊 DATABASE_CONNECTION_URI:', process.env.DATABASE_CONNECTION_URI);

// Crear cliente Prisma con configuración explícita
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_CONNECTION_URI
    }
  },
  log: ['query', 'info', 'warn', 'error'],
});

module.exports = prisma;
