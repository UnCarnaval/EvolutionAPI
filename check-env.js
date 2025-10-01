console.log('🔍 Verificando variables de entorno:');
console.log('DATABASE_CONNECTION_URI:', process.env.DATABASE_CONNECTION_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Verificar si la variable está definida
if (process.env.DATABASE_CONNECTION_URI) {
  console.log('✅ DATABASE_CONNECTION_URI está configurado');
  console.log('URL:', process.env.DATABASE_CONNECTION_URI);
} else {
  console.log('❌ DATABASE_CONNECTION_URI NO está configurado');
}
