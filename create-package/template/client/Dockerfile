# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy client package files
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci

# Copy source code
COPY client/ ./client/

# Build the application
RUN npx nx build client

# Production stage
FROM nginx:alpine AS production

# Copy built application
COPY --from=builder /app/dist/client /usr/share/nginx/html

# Copy nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactjs -u 1001

# Change ownership of nginx directories
RUN chown -R reactjs:nodejs /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

USER reactjs

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
