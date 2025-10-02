FROM node:20-alpine

# Install dependencies
RUN apk add --no-cache git python3 make g++ ffmpeg bash openssl curl

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY tsconfig.json ./
COPY tsup.config.ts ./

# Install ALL dependencies with legacy peer deps
RUN npm install --legacy-peer-deps --silent

# Copy source code and other necessary files
COPY src ./src
COPY prisma ./prisma
COPY public ./public
COPY runWithProvider.js ./
COPY start-simple.js ./
COPY check-env.js ./
COPY migrate-db.js ./

# Generate Prisma client
RUN npx prisma generate --schema ./prisma/postgresql-schema.prisma

# Build the application
RUN npm run build

# Create a simple start script that uses require instead of import
RUN echo "require('./dist/main.js');" > start.js

# Remove dev dependencies (with legacy peer deps)
RUN npm prune --production --legacy-peer-deps

# Create non-root user and set permissions
RUN addgroup -g 1001 -S nodejs && \
    adduser -S evolution -u 1001 && \
    mkdir -p uploads sessions public/manager && \
    chown -R evolution:nodejs /app

# Switch to non-root user
USER evolution

EXPOSE 8080

# Start using the CommonJS script
CMD ["node", "start.js"]