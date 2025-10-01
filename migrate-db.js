const { execSync } = require('child_process');

console.log('🗄️  Iniciando migración de base de datos...');
console.log('📊 DATABASE_CONNECTION_URI:', process.env.DATABASE_CONNECTION_URI ? 'CONFIGURADO' : 'NO CONFIGURADO');

if (!process.env.DATABASE_CONNECTION_URI) {
  console.error('❌ ERROR: DATABASE_CONNECTION_URI no está configurado');
  process.exit(1);
}

try {
  console.log('🔄 Ejecutando migraciones de Prisma...');
  
  // Solo ejecutar migraciones (sin introspección)
  execSync('npx prisma migrate deploy --schema ./prisma/postgresql-schema.prisma', {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_CONNECTION_URI
    }
  });
  
  console.log('✅ Migraciones ejecutadas exitosamente');
  console.log('✅ Base de datos configurada correctamente');
  
} catch (error) {
  console.error('❌ Error durante la migración:', error.message);
  process.exit(1);
}
