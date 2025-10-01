@echo off
echo 🗄️  MIGRACIÓN A SUPABASE
echo =========================
echo.

REM Configuración de Supabase
set SUPABASE_URL=postgresql://postgres:MICONTRASEÑASEGURA@db.apbkobhfnmcqqzqeeqss.supabase.co:5432/postgres

echo 📊 URL de Supabase: postgresql://postgres:***@db.apbkobhfnmcqqzqeeqss.supabase.co:5432/postgres
echo.

REM Confirmar migración
set /p confirm=¿Continuar con la migración? (y/N): 
if /i not "%confirm%"=="y" if /i not "%confirm%"=="yes" (
    echo ❌ Migración cancelada
    pause
    exit /b 0
)

echo 🔍 Verificando conexión a Supabase...

REM Configurar variable de entorno
set DATABASE_URL=%SUPABASE_URL%

REM Verificar conexión
npx prisma db pull --schema ./prisma/postgresql-schema.prisma --force >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error de conexión a Supabase
    echo 🔧 Verifica que la URL sea correcta y que Supabase esté funcionando
    pause
    exit /b 1
)

echo ✅ Conexión a Supabase exitosa
echo.

echo 🔄 Ejecutando migraciones...
npx prisma migrate deploy --schema ./prisma/postgresql-schema.prisma
if %errorlevel% neq 0 (
    echo ❌ Error durante las migraciones
    pause
    exit /b 1
)

echo ✅ Migraciones ejecutadas exitosamente

echo 🔍 Verificando tablas creadas...
npx prisma db pull --schema ./prisma/postgresql-schema.prisma

echo.
echo 🎉 ¡MIGRACIÓN COMPLETADA EXITOSAMENTE!
echo 📊 Puedes verificar las tablas en: https://supabase.com/dashboard
echo 🔗 Tu app en DigitalOcean debería funcionar ahora
echo.
pause
