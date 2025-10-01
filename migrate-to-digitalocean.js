const { execSync } = require('child_process');
const readline = require('readline');

// Configuración de DigitalOcean PostgreSQL
const DIGITALOCEAN_DB_URL = process.env.DATABASE_CONNECTION_URI || 'postgresql://doadmin:TU_PASSWORD@db-postgresql-nyc3-38379-do-user-13920670-0.k.db.ondigitalocean.com:25060/defaultdb?sslmode=require';

console.log('🗄️  MIGRACIÓN A DIGITALOCEAN POSTGRESQL');
console.log('==========================================');
console.log('📊 URL de DigitalOcean DB:', DIGITALOCEAN_DB_URL.replace(/:[^:]*@/, ':***@'));
console.log('');

// Función para confirmar
function confirm() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('¿Continuar con la migración? (y/N): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function migrateToDigitalOcean() {
  try {
    console.log('🔍 Verificando conexión a DigitalOcean PostgreSQL...');
    
    // Verificar conexión
    execSync(`npx prisma db pull --schema ./prisma/postgresql-schema.prisma --force`, {
      stdio: 'pipe',
      env: {
        ...process.env,
        DATABASE_URL: DIGITALOCEAN_DB_URL
      }
    });
    
    console.log('✅ Conexión a DigitalOcean PostgreSQL exitosa');
    console.log('');
    
    // Confirmar migración
    const shouldContinue = await confirm();
    if (!shouldContinue) {
      console.log('❌ Migración cancelada');
      process.exit(0);
    }
    
    console.log('🔄 Ejecutando migraciones...');
    
    // Ejecutar migraciones
    execSync(`npx prisma migrate deploy --schema ./prisma/postgresql-schema.prisma`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: DIGITALOCEAN_DB_URL
      }
    });
    
    console.log('✅ Migraciones ejecutadas exitosamente');
    
    // Verificar tablas creadas
    console.log('🔍 Verificando tablas creadas...');
    execSync(`npx prisma db pull --schema ./prisma/postgresql-schema.prisma`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: DIGITALOCEAN_DB_URL
      }
    });
    
    console.log('');
    console.log('🎉 ¡MIGRACIÓN COMPLETADA EXITOSAMENTE!');
    console.log('📊 Puedes verificar las tablas en tu panel de DigitalOcean');
    console.log('🔗 Tu app en DigitalOcean debería funcionar ahora');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    console.error('');
    console.error('🔧 Posibles soluciones:');
    console.error('1. Verificar que la URL de DigitalOcean sea correcta');
    console.error('2. Verificar que la base de datos esté funcionando');
    console.error('3. Verificar que tengas permisos en la base de datos');
    process.exit(1);
  }
}

// Ejecutar migración
migrateToDigitalOcean();
