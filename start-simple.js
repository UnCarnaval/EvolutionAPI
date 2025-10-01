console.log('🚀 Iniciando Evolution API...');
console.log('📁 Directorio de trabajo:', process.cwd());

// Verificar variables de entorno
console.log('🔧 Variables de entorno:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- DATABASE_PROVIDER:', process.env.DATABASE_PROVIDER || 'not configured');
console.log('- DATABASE_CONNECTION_URI:', process.env.DATABASE_CONNECTION_URI ? 'CONFIGURADO' : 'NO CONFIGURADO');
console.log('- PORT:', process.env.PORT || 8080);

if (!process.env.DATABASE_CONNECTION_URI) {
  console.error('❌ ERROR: DATABASE_CONNECTION_URI no está configurado');
  console.error('Por favor configura la variable de entorno DATABASE_CONNECTION_URI en DigitalOcean');
  process.exit(1);
}

// Verificar que el build existe
const fs = require('fs');
const path = require('path');
const distPath = path.join(process.cwd(), 'dist');
console.log('📦 Verificando build en:', distPath);

if (fs.existsSync(distPath)) {
  console.log('✅ Build encontrado');
} else {
  console.log('❌ Build NO encontrado');
  process.exit(1);
}

// Ejecutar migraciones primero
console.log('🗄️  Ejecutando migraciones de base de datos...');

const { spawn } = require('child_process');

// Ejecutar migraciones
const migrateChild = spawn('node', ['migrate-db.js'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

migrateChild.on('exit', (code) => {
  if (code === 0) {
    console.log('✅ Migraciones completadas');
    console.log('▶️  Ejecutando: npm run start:prod');
    
    // Ejecutar la aplicación
    const child = spawn('npm', ['run', 'start:prod'], {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    child.on('error', (error) => {
      console.error('❌ Error al iniciar la aplicación:', error.message);
      process.exit(1);
    });

    child.on('exit', (code) => {
      console.log(`📤 Aplicación terminó con código: ${code}`);
      process.exit(code);
    });
  } else {
    console.error('❌ Error en las migraciones');
    process.exit(1);
  }
});