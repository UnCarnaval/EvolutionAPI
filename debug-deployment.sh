#!/bin/bash

echo "🔍 Diagnóstico de Despliegue en DigitalOcean"
echo "=============================================="

echo ""
echo "1. Verificando variables de entorno..."
echo "NODE_ENV: ${NODE_ENV:-'NO CONFIGURADO'}"
echo "DATABASE_PROVIDER: ${DATABASE_PROVIDER:-'NO CONFIGURADO'}"
echo "JWT_SECRET: ${JWT_SECRET:-'NO CONFIGURADO'}"
echo "CORS_ORIGIN: ${CORS_ORIGIN:-'NO CONFIGURADO'}"

echo ""
echo "2. Verificando puerto..."
echo "PORT: ${PORT:-'NO CONFIGURADO'}"

echo ""
echo "3. Verificando archivos..."
if [ -f "package.json" ]; then
    echo "✅ package.json encontrado"
else
    echo "❌ package.json NO encontrado"
fi

if [ -f "dist/index.js" ]; then
    echo "✅ dist/index.js encontrado"
else
    echo "❌ dist/index.js NO encontrado"
fi

if [ -f "prisma/schema.prisma" ]; then
    echo "✅ prisma/schema.prisma encontrado"
else
    echo "❌ prisma/schema.prisma NO encontrado"
fi

echo ""
echo "4. Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules encontrado"
else
    echo "❌ node_modules NO encontrado"
fi

echo ""
echo "5. Intentando conectar a la base de datos..."
if [ -n "$DATABASE_CONNECTION_URI" ]; then
    echo "DATABASE_CONNECTION_URI configurado"
    # Aquí podrías agregar una prueba de conexión real
else
    echo "❌ DATABASE_CONNECTION_URI NO configurado"
fi

echo ""
echo "6. Verificando logs del sistema..."
echo "Uptime: $(uptime)"
echo "Memoria disponible: $(free -h 2>/dev/null || echo 'No disponible')"
echo "Espacio en disco: $(df -h 2>/dev/null || echo 'No disponible')"

echo ""
echo "✅ Diagnóstico completado"
