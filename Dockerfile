FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    ffmpeg \
    bash \
    openssl \
    curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps --silent

# Copy source code
COPY src ./src
COPY prisma ./prisma
COPY public ./public
COPY tsconfig.json ./
COPY tsup.config.ts ./
COPY runWithProvider.js ./
COPY start-simple.js ./

# Generate Prisma client
RUN npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S evolution -u 1001

# Create directories and set permissions
RUN mkdir -p uploads sessions && chown -R evolution:nodejs uploads sessions

# Switch to non-root user
USER evolution

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start the application
CMD ["node", "start-simple.js"]