#!/bin/bash

# Evolution API Deployment Script
echo "🚀 Starting Evolution API deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your production values before continuing."
    echo "   Important: Change POSTGRES_PASSWORD and JWT_SECRET!"
    read -p "Press Enter after updating .env file..."
fi

# Build and start services
echo "🔨 Building Evolution API..."
docker-compose -f docker-compose.prod.yml build

echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Evolution API is running!"
    echo "🌐 API URL: http://localhost:8080"
    echo "📊 Manager: http://localhost:8080/manager"
    echo "📚 Documentation: https://doc.evolution-api.com"
else
    echo "❌ Failed to start services. Check logs with:"
    echo "   docker-compose -f docker-compose.prod.yml logs"
fi
