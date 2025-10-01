const { PrismaClient } = require('@prisma/client');

console.log('🔍 Probando conexión a la base de datos...');
console.log('📊 Variables de entorno:');
console.log('- DATABASE_CONNECTION_URI:', process.env.DATABASE_CONNECTION_URI);
console.log('- NODE_ENV:', process.env.NODE_ENV);

if (!process.env.DATABASE_CONNECTION_URI) {
  console.error('❌ DATABASE_CONNECTION_URI no está configurado');
  process.exit(1);
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_CONNECTION_URI
    }
  }
});

async function testConnection() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa');
    
    // Probar una consulta simple
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Consulta exitosa:', result);
    
    await prisma.$disconnect();
    console.log('✅ Desconexión exitosa');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error de conexión:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('Detalles:', error);
    process.exit(1);
  }
}

testConnection();
