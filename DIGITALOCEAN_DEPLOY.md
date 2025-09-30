# Despliegue en DigitalOcean App Platform

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio

Asegúrate de que tu repositorio esté actualizado en GitHub:

```bash
git add .
git commit -m "Add DigitalOcean deployment configuration"
git push origin main
```

### 2. Crear App en DigitalOcean

1. **Ve a DigitalOcean App Platform**
   - Accede a: https://cloud.digitalocean.com/apps
   - Haz clic en "Create App"

2. **Conectar GitHub**
   - Selecciona "GitHub" como fuente
   - Autoriza DigitalOcean a acceder a tu cuenta
   - Selecciona el repositorio: `UnCarnaval/EvolutionAPI`
   - Selecciona la rama: `main`

3. **Configurar la App**
   - **Tipo**: Web Service
   - **Build Command**: `npm run build`
   - **Run Command**: `npm run start:prod`
   - **HTTP Port**: `8080`

### 3. Configurar Variables de Entorno

En la sección "Environment Variables", agrega:

```
NODE_ENV=production
DATABASE_PROVIDER=postgresql
JWT_SECRET=tu-clave-secreta-muy-segura-aqui
CORS_ORIGIN=*
REDIS_ENABLED=false
LOG_LEVEL=INFO
WHATSAPP_DEFAULT_ANSWER=Hola! Estoy usando Evolution API
WHATSAPP_GROUP_LIMIT=256
```

### 4. Configurar Base de Datos

1. **Agregar Database**
   - Haz clic en "Add Database"
   - Selecciona "PostgreSQL"
   - Versión: 15
   - Plan: Basic ($15/mes) o superior
   - Nombre: `evolution_api`

2. **Configurar Conexión**
   - La variable `DATABASE_CONNECTION_URI` se configurará automáticamente
   - Se conectará como `${db.DATABASE_URL}`

### 5. Configurar Dominio (Opcional)

1. **Dominio Personalizado**
   - Ve a "Settings" → "Domains"
   - Agrega tu dominio personalizado
   - Configura los registros DNS

2. **Dominio de DigitalOcean**
   - DigitalOcean te dará un dominio automático
   - Ejemplo: `evolution-api-xxxxx.ondigitalocean.app`

### 6. Desplegar

1. **Revisar Configuración**
   - Verifica que todo esté configurado correctamente
   - Revisa las variables de entorno

2. **Iniciar Despliegue**
   - Haz clic en "Create Resources"
   - Espera a que se complete el despliegue (5-10 minutos)

### 7. Verificar Despliegue

1. **URLs de Acceso**
   - **API**: `https://tu-app.ondigitalocean.app`
   - **Manager**: `https://tu-app.ondigitalocean.app/manager`
   - **Documentación**: `https://doc.evolution-api.com`

2. **Probar la API**
   ```bash
   curl https://tu-app.ondigitalocean.app
   ```

## 🔧 Configuración Avanzada

### Escalado Automático

```yaml
# En .do/app.yaml
autoscaling:
  min_instances: 1
  max_instances: 3
  cpu_threshold_percent: 70
```

### Monitoreo

1. **Logs**
   - Ve a "Runtime Logs" para ver logs en tiempo real
   - Configura alertas si es necesario

2. **Métricas**
   - Monitorea CPU, memoria y tráfico
   - Configura alertas de rendimiento

### Backup

1. **Base de Datos**
   - DigitalOcean hace backups automáticos
   - Configura backups manuales si es necesario

2. **Archivos**
   - Los archivos se almacenan en volúmenes persistentes
   - Considera usar Spaces para archivos grandes

## 💰 Costos Estimados

- **App Basic**: $5/mes
- **Database Basic**: $15/mes
- **Total**: ~$20/mes

## 🚨 Solución de Problemas

### Error de Build
- Verifica que `npm run build` funcione localmente
- Revisa los logs de build en DigitalOcean

### Error de Base de Datos
- Verifica que la base de datos esté corriendo
- Revisa la variable `DATABASE_CONNECTION_URI`

### Error de Puerto
- Asegúrate de que la app use el puerto 8080
- Verifica la configuración de `HTTP_PORT`

## 📞 Soporte

- **DigitalOcean Docs**: https://docs.digitalocean.com/products/app-platform/
- **Evolution API Docs**: https://doc.evolution-api.com
- **GitHub Issues**: https://github.com/UnCarnaval/EvolutionAPI/issues
