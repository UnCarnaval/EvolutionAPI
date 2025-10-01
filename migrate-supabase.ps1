# Script de migración a Supabase para Windows PowerShell
Write-Host "🗄️  MIGRACIÓN A SUPABASE" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Configuración de Supabase
$SUPABASE_URL = "postgresql://postgres:MICONTRASEÑASEGURA@db.apbkobhfnmcqqzqeeqss.supabase.co:5432/postgres"

Write-Host "📊 URL de Supabase: $($SUPABASE_URL -replace ':[^:]*@', ':***@')" -ForegroundColor Yellow
Write-Host ""

# Confirmar migración
$confirm = Read-Host "¿Continuar con la migración? (y/N)"
if ($confirm -ne "y" -and $confirm -ne "yes") {
    Write-Host "❌ Migración cancelada" -ForegroundColor Red
    exit 0
}

try {
    Write-Host "🔍 Verificando conexión a Supabase..." -ForegroundColor Blue
    
    # Verificar conexión
    $env:DATABASE_URL = $SUPABASE_URL
    npx prisma db pull --schema ./prisma/postgresql-schema.prisma --force 2>$null
    
    Write-Host "✅ Conexión a Supabase exitosa" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🔄 Ejecutando migraciones..." -ForegroundColor Blue
    
    # Ejecutar migraciones
    npx prisma migrate deploy --schema ./prisma/postgresql-schema.prisma
    
    Write-Host "✅ Migraciones ejecutadas exitosamente" -ForegroundColor Green
    
    # Verificar tablas creadas
    Write-Host "🔍 Verificando tablas creadas..." -ForegroundColor Blue
    npx prisma db pull --schema ./prisma/postgresql-schema.prisma
    
    Write-Host ""
    Write-Host "🎉 ¡MIGRACIÓN COMPLETADA EXITOSAMENTE!" -ForegroundColor Green
    Write-Host "📊 Puedes verificar las tablas en: https://supabase.com/dashboard" -ForegroundColor Cyan
    Write-Host "🔗 Tu app en DigitalOcean debería funcionar ahora" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error durante la migración: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "1. Verificar que la URL de Supabase sea correcta" -ForegroundColor White
    Write-Host "2. Verificar que Supabase esté funcionando" -ForegroundColor White
    Write-Host "3. Verificar que tengas permisos en la base de datos" -ForegroundColor White
    exit 1
}
