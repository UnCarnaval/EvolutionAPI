const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando Evolution API (Modo Simple)...');
console.log('📁 Directorio de trabajo:', process.cwd());
console.log('🔧 Variables de entorno:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- DATABASE_PROVIDER:', process.env.DATABASE_PROVIDER || 'not configured');
console.log('- PORT:', process.env.PORT || 8080);

try {
  // Verificar que el build existe
  const distPath = path.join(process.cwd(), 'dist');
  console.log('📦 Verificando build en:', distPath);
  
  // Ejecutar la aplicación
  console.log('▶️  Ejecutando: npm run start:prod');
  execSync('npm run start:prod', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
} catch (error) {
  console.error('❌ Error al iniciar la aplicación:', error.message);
  process.exit(1);
}
