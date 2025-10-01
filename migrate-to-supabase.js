const { execSync } = require('child_process');
const readline = require('readline');

// Configuración de Supabase
const SUPABASE_URL = 'postgresql://postgres.kgavaxvzegkdnogknshn:MTK1ygr0bmu3ndv-dut@aws-1-us-east-2.pooler.supabase.com:5432/postgres';

console.log('🗄️  MIGRACIÓN A SUPABASE');
console.log('========================');
console.log('📊 URL de Supabase:', SUPABASE_URL.replace(/:[^:]*@/, ':***@'));
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

async function migrateToSupabase() {
  try {
    console.log('🔍 Verificando conexión a Supabase...');
    
    // Verificar conexión
    execSync(`npx prisma db pull --schema ./prisma/postgresql-schema.prisma --force`, {
      stdio: 'pipe',
      env: {
        ...process.env,
        DATABASE_URL: SUPABASE_URL
      }
    });
    
    console.log('✅ Conexión a Supabase exitosa');
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
        DATABASE_URL: SUPABASE_URL
      }
    });
    
    console.log('✅ Migraciones ejecutadas exitosamente');
    
    // Verificar tablas creadas
    console.log('🔍 Verificando tablas creadas...');
    execSync(`npx prisma db pull --schema ./prisma/postgresql-schema.prisma`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: SUPABASE_URL
      }
    });
    
    console.log('');
    console.log('🎉 ¡MIGRACIÓN COMPLETADA EXITOSAMENTE!');
    console.log('📊 Puedes verificar las tablas en: https://supabase.com/dashboard');
    console.log('🔗 Tu app en DigitalOcean debería funcionar ahora');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    console.error('');
    console.error('🔧 Posibles soluciones:');
    console.error('1. Verificar que la URL de Supabase sea correcta');
    console.error('2. Verificar que Supabase esté funcionando');
    console.error('3. Verificar que tengas permisos en la base de datos');
    process.exit(1);
  }
}

// Ejecutar migración
migrateToSupabase();
