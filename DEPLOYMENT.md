# Evolution API - Deployment Guide

## 🚀 Despliegue en Servidor en la Nube

### Requisitos Previos

- Docker y Docker Compose instalados
- Puerto 8080 disponible
- Al menos 2GB de RAM
- 10GB de espacio en disco

### Pasos para Desplegar

#### 1. Clonar el Repositorio
```bash
git clone <tu-repositorio>
cd evolution-api-main
```

#### 2. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar con tus valores de producción
nano .env
```

**Variables importantes a cambiar:**
- `POSTGRES_PASSWORD`: Contraseña segura para PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT (muy importante)
- `SERVER_URL`: URL de tu servidor (ej: https://api.tudominio.com)

#### 3. Desplegar con Docker Compose
```bash
# Hacer ejecutable el script
chmod +x deploy.sh

# Ejecutar despliegue
./deploy.sh
```

#### 4. Verificar el Despliegue
```bash
# Verificar que los servicios estén corriendo
docker-compose -f docker-compose.prod.yml ps

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

### URLs de Acceso

- **API**: http://tu-servidor:8080
- **Manager Web**: http://tu-servidor:8080/manager
- **Documentación**: https://doc.evolution-api.com

### Comandos Útiles

```bash
# Iniciar servicios
docker-compose -f docker-compose.prod.yml up -d

# Detener servicios
docker-compose -f docker-compose.prod.yml down

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f evolution-api

# Reiniciar solo Evolution API
docker-compose -f docker-compose.prod.yml restart evolution-api

# Actualizar la aplicación
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### Backup de Datos

```bash
# Backup de la base de datos
docker exec evolution-postgres pg_dump -U postgres evolution_api > backup.sql

# Restaurar backup
docker exec -i evolution-postgres psql -U postgres evolution_api < backup.sql
```

### Configuración de Nginx (Opcional)

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Monitoreo

```bash
# Ver uso de recursos
docker stats

# Ver espacio en disco
docker system df
```

### Solución de Problemas

1. **Error de conexión a base de datos**: Verificar que PostgreSQL esté corriendo
2. **Puerto ocupado**: Cambiar el puerto en docker-compose.prod.yml
3. **Memoria insuficiente**: Aumentar recursos del servidor
4. **Permisos**: Verificar que Docker tenga permisos suficientes

### Seguridad

- Cambiar todas las contraseñas por defecto
- Usar HTTPS en producción
- Configurar firewall
- Hacer backups regulares
- Mantener actualizado el sistema
