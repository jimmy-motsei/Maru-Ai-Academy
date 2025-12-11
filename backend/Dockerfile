# Stage 1: Build
FROM node:18-slim AS builder

WORKDIR /app

# Install dependencies (including devDependencies for build)
COPY package*.json ./
RUN npm ci

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source and build TypeScript
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Production
FROM node:18-slim

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --only=production

# Copy generated Prisma client from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist

# Environment setup
ENV NODE_ENV=production
ENV PORT=8080

# Security: Run as non-root user
USER node

EXPOSE 8080

CMD ["node", "dist/index.js"]
