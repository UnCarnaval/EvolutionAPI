const { PrismaClient } = require('@prisma/client');

console.log('🔍 Verificando conexión a la base de datos...');
console.log('📊 Variables de entorno:');
console.log('- DATABASE_CONNECTION_URI:', process.env.DATABASE_CONNECTION_URI || 'NO CONFIGURADO');
console.log('- DATABASE_PROVIDER:', process.env.DATABASE_PROVIDER || 'NO CONFIGURADO');

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
    console.log('🔄 Intentando conectar a la base de datos...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa a la base de datos');
    
    // Probar una consulta simple
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Consulta de prueba exitosa:', result);
    
    await prisma.$disconnect();
    console.log('✅ Desconexión exitosa');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('🔍 Detalles del error:', error);
    process.exit(1);
  }
}

testConnection();
