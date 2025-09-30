# Evolution API - WhatsApp Business API

🚀 **API REST completa para controlar WhatsApp a través de solicitudes HTTP**

## ✨ Características

- 📱 **Control total de WhatsApp** - Enviar/recibir mensajes, multimedia, stickers
- 🤖 **Soporte para Chatbots** - OpenAI, Dify, Typebot, Flowise, N8N
- 🔗 **Webhooks** - Eventos en tiempo real
- 💾 **Base de datos** - PostgreSQL con Prisma ORM
- 🐳 **Docker** - Despliegue fácil en cualquier servidor
- 🌐 **Manager Web** - Interfaz gráfica para gestión
- 📊 **Múltiples instancias** - Gestiona varios números de WhatsApp

## 🚀 Inicio Rápido

### Opción 1: Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/UnCarnaval/EvolutionAPI.git
cd EvolutionAPI

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Desplegar con Docker
docker-compose -f docker-compose.prod.yml up -d
```

### Opción 2: Instalación Local

```bash
# Instalar dependencias
npm install

# Configurar base de datos
npm run db:generate
npm run db:deploy:win

# Iniciar servidor
npm start
```

## 📋 Requisitos

- Node.js 20+
- PostgreSQL 15+
- Docker (opcional)
- 2GB RAM mínimo
- 10GB espacio en disco

## 🔧 Configuración

### Variables de Entorno Importantes

```env
# Base de datos
DATABASE_PROVIDER=postgresql
DATABASE_CONNECTION_URI=postgresql://postgres:password@localhost:5432/evolution_api

# Servidor
SERVER_URL=http://localhost:8080
JWT_SECRET=tu-clave-secreta-aqui

# WhatsApp
WHATSAPP_DEFAULT_ANSWER=Hola! Estoy usando Evolution API
```

## 🌐 URLs de Acceso

- **API**: http://localhost:8080
- **Manager Web**: http://localhost:8080/manager
- **Documentación**: https://doc.evolution-api.com

## 📚 Documentación

- [Guía de Despliegue](DEPLOYMENT.md)
- [Documentación Oficial](https://doc.evolution-api.com)
- [Ejemplos de Uso](https://github.com/EvolutionAPI/evolution-api/tree/main/Examples)

## 🤖 Chatbots Soportados

- **OpenAI** - GPT-3.5, GPT-4
- **Dify** - Plataforma de IA
- **Typebot** - Flujos conversacionales
- **Flowise** - Flujos de IA visuales
- **N8N** - Automatización
- **Evolution Bot** - Bot nativo

## 🔗 Integraciones

- **Webhooks** - Eventos en tiempo real
- **RabbitMQ** - Cola de mensajes
- **Redis** - Caché de alta velocidad
- **Sentry** - Monitoreo de errores

## 📦 Despliegue en la Nube

### AWS, DigitalOcean, Vultr, etc.

```bash
# Clonar en tu servidor
git clone https://github.com/UnCarnaval/EvolutionAPI.git
cd EvolutionAPI

# Configurar variables de producción
nano .env

# Desplegar
docker-compose -f docker-compose.prod.yml up -d
```

## 🛠️ Comandos Útiles

```bash
# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Reiniciar servicios
docker-compose -f docker-compose.prod.yml restart

# Backup de base de datos
docker exec evolution-postgres pg_dump -U postgres evolution_api > backup.sql

# Actualizar aplicación
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0. Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/UnCarnaval/EvolutionAPI/issues)
- **Discord**: [Evolution API Discord](https://discord.gg/evolutionapi)
- **Documentación**: [doc.evolution-api.com](https://doc.evolution-api.com)

## ⭐ Estrellas

Si este proyecto te ayuda, ¡dale una estrella! ⭐

---

**Desarrollado con ❤️ por [UnCarnaval](https://github.com/UnCarnaval)**