console.log('🚀 Iniciando Evolution API...');
console.log('📁 Directorio de trabajo:', process.cwd());
console.log('🔧 Variables de entorno:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- DATABASE_PROVIDER:', process.env.DATABASE_PROVIDER || 'not configured');
console.log('- PORT:', process.env.PORT || 8080);

// Verificar que el build existe
const fs = require('fs');
const path = require('path');

const distPath = path.join(process.cwd(), 'dist');
console.log('📦 Verificando build en:', distPath);

if (fs.existsSync(distPath)) {
  console.log('✅ Build encontrado');
} else {
  console.log('❌ Build NO encontrado');
}

// Ejecutar la aplicación
console.log('▶️  Ejecutando: npm run start:prod');

const { spawn } = require('child_process');

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