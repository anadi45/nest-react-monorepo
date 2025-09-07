# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy server package files
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY server/ ./server/

# Build the application
RUN npx nx build server

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/dist/server ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

USER nestjs

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/main.js"]
